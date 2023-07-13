import L from "leaflet";
import axios from "axios";
import {
  createActivityHTML,
  delayTimer,
  filterObjectsByRadius,
  randomThreeFromArray,
} from "./helpers";
import DUMMY_ATTRACTIONS from "./data/attractions.json";

const DUMMY_ACTIVITY_API_DATA = {
  context: "http://schema.org",
  type: [
    "LocalBusiness",
    "TouristAttraction",
    "LandmarksOrHistoricalBuildings",
  ],
  address: {
    type: "PostalAddress",
    addressLocality: "Conna",
    addressRegion: "Cork",
    addressCountry: "Republic of Ireland",
  },
  geo: {
    type: "GeoCoordinates",
    longitude: -8.1016545,
    latitude: 52.0945205,
  },
  image: {
    type: "ImageObject",
    caption: "Fáilte Ireland Logo",
    url: "https://failtecdn.azureedge.net/failteireland/F%C3%A1ilte_Ireland_Logo_OpenDataAPI.jpg",
  },
  name: "Conna Castle",
  tags: ["Activity", "Castle", "Attraction", "Historic Houses and Castle"],
  telephone: "+353862149601",
  url: "https://www.castles.nl/conna-castle",
};

const fetchCountryBtn = document.getElementById("fetch-country-btn");
const geolocationBtn = document.getElementById("geolocation-btn");
const activitiesBtn = document.getElementById("activities-btn");
const actvityWrapper = document.getElementById("activities");

const map = L.map("map").setView([51.505, -0.09], 8);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Async function that fetching country information from rest-countries API
async function fetchCountryData() {
  const url = `https://restcountries.com/v3.1/name/ireland`;
  try {
    // const { data } = await axios(url);
    const response = await fetch(url);
    const data = await response.json();

    const { capitalInfo } = data[1]; // This is due to two results from Ireland , GB and Ire
    const { latlng } = capitalInfo;
    map.flyTo([latlng[0], latlng[1]], 13);
    displayCountryFlag(data[1].name.common, data[1].flags.svg);
  } catch (error) {
    console.log(error);
  }
}

// Using web geolocation to find current users location and display on map
async function getCurrentLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    map.flyTo([lat, lng], 14);
    placeMarker([lat, lng]);

    const coords = { lat, lng };
    const filteredAttractions = filterObjectsByRadius(
      coords,
      DUMMY_ATTRACTIONS,
      30
    );

    filteredAttractions.forEach((attraction) => placeToolTipMarker(attraction));

    console.log(filteredAttractions);
  } catch (error) {
    console.log(error);
  }
}

// Place a marker the map
function placeMarker(location) {
  const marker = L.marker(location).addTo(map);
  return marker;
}

// Places a marker with a tooltip on the map
function placeToolTipMarker(location) {
  const { lat, lng } = location;
  const marker = placeMarker([lat, lng]);
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
// Function to dynamically render a countries flag to the DOM
function displayCountryFlag(country, flagUrl) {
  const flag = document.getElementById("flag");
  flag.src = flagUrl;
  flag.alt = `${country}'s flag`;
}

// Async function to fetch activity data from Failte Irelands API
async function getFailteIrelandsAttractionsAPI() {
  try {
    actvityWrapper.innerHTML = "";
    const loader = document.createElement("div");
    actvityWrapper.appendChild(loader);
    loader.id = "loader";

    const results = [];

    // const { data } = await axios.get(
    //   "https://failteireland.azure-api.net/opendata-api/v1/attractions"
    // );

    const response = await fetch(
      "https://failteireland.azure-api.net/opendata-api/v1/attractions"
    );
    const data = await response.json();

    results.push(data);

    // await fetchAlFailteIrelandActivities(data, results);

    actvityWrapper.innerHTML = "";
    const randomThreeActivites = randomThreeFromArray(data.results);

    randomThreeActivites.forEach((activity) => displayActivites(activity));
  } catch (error) {
    console.log(error);
  }
}

// Gets FailteIrelands Attraction data from parsed CSV into JSON object array

async function getFailteIrelandsAttractionsData() {
  try {
    actvityWrapper.innerHTML = "";
    const loader = document.createElement("div");
    actvityWrapper.appendChild(loader);
    loader.id = "loader";

    await delayTimer(100); // Simulating fetch request delay

    actvityWrapper.innerHTML = "";
    const randomThreeActivites = randomThreeFromArray(DUMMY_ATTRACTIONS);

    removeAllMarkers(map);

    randomThreeActivites.forEach((attraction) =>
      placeToolTipMarker(attraction)
    );

    randomThreeActivites.forEach((activity) => displayActivites(activity));
  } catch (error) {
    console.log(error);
  }
}

// async function fetchAlFailteIrelandActivities(lastReq, results, count = 0) {
//   await delayTimer(1000);
//   const { data } = await axios(lastReq.nextPage);
//   results.push(data);
//   console.log(count);
//   if (data.nextPage && count < 9) {
//     count++;
//     fetchAlFailteIrelandActivities(data, results, count);
//   }
//   return;
// }

// Renders actvities to the DOM
function displayActivites(activities) {
  if (!activities) return;
  const activitiesElements = createActivityHTML(activities);

  [activitiesElements].forEach((element) => {
    actvityWrapper.appendChild(activitiesElements);
  });
}

fetchCountryBtn.addEventListener("click", fetchCountryData);
geolocationBtn.addEventListener("click", getCurrentLocation);
activitiesBtn.addEventListener("click", getFailteIrelandsAttractionsData);
