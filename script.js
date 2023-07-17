// import L from "leaflet";
import { capitalize, filterObjectsByRadius } from "./helpers";
import DUMMY_ATTRACTIONS from "./assets/data/testing2.json";
import DUMMY_ACTIVITIES from "./assets/data/testing.json";
import {
  favouriteMarkerIcon,
  selectMapTheme,
  selectMarkerIconFromValue,
} from "./mapscript";
import { createActivityHTML } from "./html-renders";

// const fetchCountryBtn = document.getElementById("fetch-country-btn");
const geolocationBtn = document.getElementById("geolocation-btn");
const nearbyLocationsBtn = document.getElementById("locations-btn");
const favouritesBtn = document.getElementById("favourites");
const actvityWrapper = document.getElementById("activities");
const filterSelector = document.getElementById("filter");
const distanceSelector = document.getElementById("distance");
const settingsModalBtn = document.getElementById("settings");
const closeSettingsModalBtn = document.getElementById("close-modal");
const settingsModal = document.getElementById("settings-modal");
const activitiesModal = document.getElementById("activites-modal");
const background = document.getElementById("background");
const mapBtnContainers = document.querySelector(".map-btns-container");
const closeActivityModal = document.getElementById("close-activity-modal");
const mapSelector = document.getElementById("map-selector");

// initialise leaflet map, desired location and zoom level
const map = L.map("map").setView([53.34, -6.26], 8);

const LAYERS = [];
setMap();

function setMap() {
  const mapValue = mapSelector.value;
  const mapValueText = document.getElementById("map-value");

  mapValueText.textContent = capitalize(mapValue);

  LAYERS.forEach((layer) => map.removeLayer(layer));

  const tileLayer = selectMapTheme(mapValue);

  tileLayer.addTo(map);

  LAYERS.push(tileLayer);
}

// Using web geolocation to find current users location and display on map
async function getCurrentLocationLatLng() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    return { lat, lng };
  } catch (error) {
    console.log(error);
  }
}

async function flyToCurrentLocation() {
  geolocationBtn.innerHTML = "";
  const loader = document.createElement("div");
  loader.id = "loader";
  geolocationBtn.appendChild(loader);

  const { lat, lng } = await getCurrentLocationLatLng();
  geolocationBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';
  map.flyTo([lat, lng], 14);
  placeMarker([lat, lng]);
}

async function getLocationsNearMe() {
  const { lat, lng } = await getCurrentLocationLatLng();

  const coords = { lat, lng };
  const filteredAttractions = filterObjectsByRadius(
    coords,
    [...DUMMY_ATTRACTIONS, ...DUMMY_ACTIVITIES],
    distanceSelector.value
  );

  return filteredAttractions;
}

async function displayFilteredLocationsNearMe() {
  nearbyLocationsBtn.innerHTML = "";
  const loader = document.createElement("div");
  loader.id = "loader";
  nearbyLocationsBtn.appendChild(loader);
  removeAllMarkers(map);
  const filteredAttractions = await getLocationsNearMe();

  nearbyLocationsBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

  filteredAttractions.forEach((attraction) => {
    const icon = selectMarkerIconFromValue(attraction);

    const { lat, lng } = attraction;
    placeInteractiveMarker({ lat, lng }, icon, attraction);
    // displayActivites(attraction);
  });

  fitMarkersInView();
  closeModal();
}

// Place a marker on the map
function placeMarker(location, icon) {
  let marker;
  icon
    ? (marker = L.marker(location, { icon: icon }).addTo(map))
    : (marker = L.marker(location).addTo(map));
  return marker;
}

function removeRouteFromMap(map) {
  const popupElement = document.querySelector(".leaflet-routing-container");
  if (popupElement) {
    popupElement.parentNode.removeChild(popupElement);
  }
  map.eachLayer(function (layer) {
    if (layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });
}

async function routeFromCurrentLocation(location) {
  closeModal();
  removeRouteFromMap(map);

  const { lat, lng } = await getCurrentLocationLatLng();

  placeMarker([lat, lng]);
  L.Routing.control({
    waypoints: [L.latLng(lat, lng), L.latLng(location.lat, location.lng)],
    routeWhileDragging: true,
    createMarker: function () {
      return null;
    },
    show: false,
    lineOptions: {
      styles: [{ color: "green", opacity: 0.8, weight: 10 }],
    },
  }).addTo(map);
}

function placeInteractiveMarker(location, icon, activity) {
  const { lat, lng } = location;
  const marker = placeMarker([lat, lng], icon);

  marker.addEventListener("mouseover", () => {
    marker.bindTooltip(activity.name).openTooltip();
  });

  marker.addEventListener("click", () => {
    renderActivityPopup(activity);
  });

  return marker;
}

function renderActivityPopup(activity) {
  activitiesModal.style.display = "flex";
  background.style.display = "flex";
  mapBtnContainers.style.display = "none";
  const activityElement = createActivityHTML(activity);

  const favouriteBtn = activityElement.querySelector(".favourite-btn");
  const directionBtn = activityElement.querySelector(".direction-btn");

  const { lat, lng } = activity;

  favouriteBtn.addEventListener("click", (e) => toggleFavourites(e, activity));
  directionBtn.addEventListener("click", () =>
    routeFromCurrentLocation({ lat, lng })
  );

  activitiesModal.appendChild(activityElement);
}

// Places a marker with a tooltip on the map
function placeToolTipMarker(location, icon) {
  const { lat, lng } = location;
  const marker = placeMarker([lat, lng], icon);
  marker.bindTooltip(location.name).openTooltip();

  return marker;
}

// Removes all markers from the map
function removeAllMarkers(map) {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
}

// Find all Markers currently on the map
function getAllMarkers() {
  const allMarkers = [];

  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      allMarkers.push(layer);
    }
  });

  return allMarkers;
}

// Fit all the markers available within the view of the map
function fitMarkersInView() {
  const markerBounds = L.latLngBounds();

  const markers = getAllMarkers();

  if (markers.length === 0) return;
  // Iterate over each marker and extend the bounds
  markers.forEach((marker) => {
    markerBounds.extend(marker.getLatLng());
  });

  // Fit the marker bounds within the map's view
  map.fitBounds(markerBounds);
}

function toggleFavourites(e, activity) {
  console.log(e);
  const closestButton = e.target.closest("button");
  closestButton.classList.toggle("favourite");

  const currentStoredFavourites = localStorage.getItem("favourites");
  activity.favourited = !activity.favourited;

  // If not storage
  if (!currentStoredFavourites) {
    localStorage.setItem("favourites", JSON.stringify([activity]));
    return;
  }
  const currentFavourites = JSON.parse(currentStoredFavourites);
  // filter to see if activity exists
  const existingActivity = currentFavourites.find(
    (fav) => fav.name === activity.name
  );

  // if activity exists
  if (existingActivity) {
    const newFavourites = currentFavourites.filter(
      (fav) => fav.name !== activity.name
    );
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
    return;
  }

  // if activity doesnt exist
  localStorage.setItem(
    "favourites",
    JSON.stringify([...currentFavourites, activity])
  );
}

function loadAllFavourites() {
  const currentStoredFavourites = localStorage.getItem("favourites");
  if (!currentStoredFavourites) {
    alert("NO current favourites");
    return;
  }
  const currentFavourites = JSON.parse(currentStoredFavourites);

  if (currentFavourites.length === 0) {
    alert("NO current favourites");
    return;
  }

  currentFavourites.forEach((activity) =>
    placeToolTipMarker(activity, favouriteMarkerIcon)
  );

  fitMarkersInView();
}

function flyToLocation(coords) {
  map.flyTo(coords, 14);
}

async function filterActivityData() {
  const value = filterSelector.value;
  nearbyLocationsBtn.innerHTML = "";
  const loader = document.createElement("div");
  loader.id = "loader";
  nearbyLocationsBtn.appendChild(loader);
  removeAllMarkers(map);
  const nearbyLocations = await getLocationsNearMe();
  const filteredActivities = nearbyLocations.filter(
    (activity) => activity.category === value
  );

  nearbyLocationsBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

  displayFilteredActivtiesOnMap(
    value === "all" ? nearbyLocations : filteredActivities
  );
}

function displayFilteredActivtiesOnMap(filteredActivities) {
  removeAllMarkers(map);
  filteredActivities.forEach((activity) => {
    const icon = selectMarkerIconFromValue(activity);
    const { lat, lng } = activity;
    placeInteractiveMarker({ lat, lng }, icon, activity);
  });
  fitMarkersInView();
  closeModal();
}

function openModal() {
  settingsModal.style.display = "flex";
  background.style.display = "flex";
}

function closeModalOnClick(e) {
  if (
    e.target === background ||
    e.target === closeSettingsModalBtn ||
    e.target === closeActivityModal
  ) {
    background.style.display = "none";
    settingsModal.style.display = "none";
    activitiesModal.style.display = "none";
    mapBtnContainers.style.display = "flex";
  }
}

function closeModal() {
  background.style.display = "none";
  settingsModal.style.display = "none";
  mapBtnContainers.style.display = "flex";
  activitiesModal.style.display = "none";
}

function updateCategoryFilterText() {
  const element = document.getElementById("catagory-value");
  element.textContent = capitalize(filterSelector.value);
}

function updateDistanceFilterText() {
  const element = document.getElementById("distance-value");
  element.textContent = capitalize(distanceSelector.value) + "Km";
}

var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      } else {
        entry.target.classList.remove("animate");
      }
    });
  },
  { threshold: 0.5 }
);

geolocationBtn.addEventListener("click", flyToCurrentLocation);
favouritesBtn.addEventListener("click", loadAllFavourites);
nearbyLocationsBtn.addEventListener("click", filterActivityData);
filterSelector.addEventListener("change", updateCategoryFilterText);
distanceSelector.addEventListener("change", updateDistanceFilterText);
settingsModalBtn.addEventListener("click", openModal);
closeSettingsModalBtn.addEventListener("click", closeModalOnClick);
background.addEventListener("click", closeModalOnClick);
closeActivityModal.addEventListener("click", closeModalOnClick);
mapSelector.addEventListener("change", setMap);
