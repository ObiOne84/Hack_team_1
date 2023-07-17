// Takes an array and returns a random 3 items from it
export function randomThreeFromArray(array) {
  let randomItems = [];

  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    randomItems.push(array.splice(randomIndex, 1)[0]);
  }

  return randomItems;
}

// Delay timer for UI/Rate Limit
export function delayTimer(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// filter objects by radius and return filtered array
export function filterObjectsByRadius(originalCoords, objects, radiusInKm) {
  const filteredObjects = [];

  for (const obj of objects) {
    const distance = calculateDistance(originalCoords, obj);
    if (distance <= radiusInKm) {
      filteredObjects.push(obj);
    }
  }

  return filteredObjects;
}

export function isFavouritedActivity(activity) {
  const currentStoredFavourites = localStorage.getItem("favourites");
  if (!currentStoredFavourites) return;
  const currentFavourites = JSON.parse(currentStoredFavourites);

  if (currentFavourites) {
    return currentFavourites.find(
      (favourite) => favourite.name === activity.name
    );
  }
  return null;
}

// Calculate the distace between to coords
function calculateDistance(coords1, coords2) {
  const earthRadiusKm = 6371;
  const { lat: lat1, lng: lng1 } = coords1;
  const { lat: lat2, lng: lng2 } = coords2;

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  // Trig functions used to find the circumference and radial distances
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;

  return distance;
}

// convert the degrees into a radial line distance
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

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
      placeToolTipMarker(attraction, attractionMarkerIcon)
    );

    randomThreeActivites.forEach((activity) => displayActivites(activity));
  } catch (error) {
    console.log(error);
  }
}

async function getFailteIrelandsActivitiesData() {
  try {
    actvityWrapper.innerHTML = "";
    const loader = document.createElement("div");
    actvityWrapper.appendChild(loader);
    loader.id = "loader";

    await delayTimer(100); // Simulating fetch request delay

    actvityWrapper.innerHTML = "";
    const randomThreeActivites = randomThreeFromArray(DUMMY_ACTIVITIES);

    removeAllMarkers(map);

    DUMMY_ACTIVITIES.forEach((attraction) =>
      placeToolTipMarker(attraction, activityMarkerIcon)
    );

    randomThreeActivites.forEach((activity) => displayActivites(activity));
  } catch (error) {
    console.log(error);
  }
}

// Renders actvities to the DOM
function displayActivites(activity) {
  if (!activity) return;
  const activitiesElement = createActivityHTML(activity);

  const flyBtn = activitiesElement.querySelector(".fly-btn");
  const favouriteBtn = activitiesElement.querySelector(".favourite-btn");

  const { lat, lng } = activity;

  flyBtn.addEventListener("click", () => flyToLocation([lat, lng]));
  favouriteBtn.addEventListener("click", (e) => toggleFavourites(e, activity));
  actvityWrapper.appendChild(activitiesElement);
}
