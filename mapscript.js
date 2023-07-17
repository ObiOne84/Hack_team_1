import attractionMarkerImage from "./assets/images/markers/attraction-marker.png";
import activityMarkerImage from "./assets/images/markers/scenic.png";
import foodMarkerImage from "./assets/images/markers/food.png";
import cityMarkerImage from "./assets/images/markers/city.png";
import cultureMarkerImage from "./assets/images/markers/culture.png";
import favouriteMarkerImage from "./assets/images/markers/favourite.png";
import luxuryMarkerImage from "./assets/images/markers/luxury.png";
import parkMarkerImage from "./assets/images/markers/park.png";
import sportsMarkerImage from "./assets/images/markers/sport.png";
import { isFavouritedActivity } from "./helpers";

export const attractionMarkerIcon = L.icon({
  iconUrl: attractionMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

export const activityMarkerIcon = L.icon({
  iconUrl: activityMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

export const foodMarkerIcon = L.icon({
  iconUrl: foodMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

export const cityMarkerIcon = L.icon({
  iconUrl: cityMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

export const cultureMarkerIcon = L.icon({
  iconUrl: cultureMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

export const favouriteMarkerIcon = L.icon({
  iconUrl: favouriteMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

export const luxuryMarkerIcon = L.icon({
  iconUrl: luxuryMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

export const parkMarkerIcon = L.icon({
  iconUrl: parkMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

export const sportsMarkerIcon = L.icon({
  iconUrl: sportsMarkerImage,
  iconSize: [60, 60],
  iconAnchor: [16, 32],
});

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

export const ALL_CATEGORIES = {
  food: [
    "Food and Drink",
    "Restaurant",
    "Local Produce",
    "Food Shops",
    "Cafe",
    "Pubs and Bar",
    "Fast Food",
    "Cooking",
    "Cookery",
    "Vegetarian",
    "Seafood",
    "Food Trails and Tour",
    "Fine Dining",
    "Vegan",
    "Banquet",
  ],
  sport: [
    "Kayaking",
    "Activity Operator",
    "Walking",
    "Boat",
    "Cycling",
    "Horse Riding",
    "Equestrian",
    "Fitness and Leisure",
    "Fishing",
    "Angling",
    "Swimming",
    "Swimming Pools and Water Park",
    "Swimming Pool",
    "Sailing",
    "Climbing",
    "Golf",
    "Zip Lining",
    "Sports Venues",
    "Adventure Park",
    "Kitesurfing",
    "Windsurfing",
    "Surfing",
    "Race Course",
    "Golf Course",
    "Driving Range",
    "Golf Driving Range",
    "Gaa",
    "Pitch And Putt",
    "Pitch and Putt",
    "Sports Venue",
  ],
  scenic: [
    "Day Tour",
    "Tour",
    "Forest Park",
    "Park and Forest Walk",
    "Public Park",
    "Nature and Wildlife",
    "Bird Watching",
    "Transport",
    "Coach",
    "Road",
    "Marina",
    "Photography",
    "Agriculture",
    "Gardening",
    "Historic Houses and Castle",
    "Island",
    "Offshore Island",
    "Natural Landscape",
    "Castle",
    "Visitor Farm",
    "Church Abbey",
    "Monastery",
    "Churches",
    "Abbeys and Monastery",
    "Falconry",
    "Gardens",
    "Garden",
    "Discovery Point",
    "Ruins",
    "National Park",
    "National and Forest Park",
    "Beach",
  ],
  culture: [
    "Traditionally Irish",
    "Venue",
    "Music",
    "Craft",
    "Tracing Your Ancestors",
    "Learning",
    "Artisan",
    "Art Gallery",
    "Museums and Attraction",
    "Literary Ireland",
    "Public Sculpture",
  ],
  city: [
    "Shopping",
    "Shopping Centres and Department Store",
    "Movies",
    "Cinema",
    "Comedy",
    "Embarkation Point",
    "Zoos and Aquarium",
    "General",
    "Casinos",
    "Stadium",
  ],
  luxury: [
    "Pampering",
    "Health Farm",
    "Spa and Wellness",
    "Specialised Retreat",
    "Cruising",
    "Spa",
  ],
};

export function selectMarkerIconFromValue(activity) {
  let icon;

  switch (activity.category) {
    case "food":
      icon = foodMarkerIcon;
      break;
    case "sport":
      icon = sportsMarkerIcon;
      break;
    case "scenic":
      icon = parkMarkerIcon;
      break;
    case "luxury":
      icon = luxuryMarkerIcon;
      break;
    case "culture":
      icon = cultureMarkerIcon;
      break;
    case "city":
      icon = cityMarkerIcon;
      break;
    default:
      icon = activityMarkerIcon;
      break;
  }

  if (isFavouritedActivity(activity)) {
    icon = favouriteMarkerIcon;
  }

  return icon;
}

const waterColourMap = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 1,
    maxZoom: 16,
    ext: "jpg",
  }
);

const natGeoMap = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
    maxZoom: 16,
  }
);

const defaultMap = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
);

const darkMap = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);

export function selectMapTheme(value) {
  let map;

  switch (value) {
    case "default":
      map = defaultMap;
      break;
    case "dark":
      map = darkMap;
      break;
    case "natgeo":
      map = natGeoMap;
      break;
    case "watercolour":
      map = waterColourMap;
      break;
    default:
      map = defaultMap;
      break;
  }

  return map;
}

// export const ALL_TAGS = [
//   "Food and Drink",
//   "Restaurant",
//   "Local Produce",
//   "Kayaking",
//   "Activity Operator",
//   "Walking",
//   "Day Tour",
//   "Tour",
//   "Boat",
//   "Traditionally Irish",
//   "Venue",
//   "Music",
//   "Forest Park",
//   "Park and Forest Walk",
//   "Cycling",
//   "Public Park",
//   "Nature and Wildlife",
//   "Bird Watching",
//   "Craft",
//   "Shopping",
//   "Shopping Centres and Department Store",
//   "Food Shops",
//   "Cafe",
//   "Tracing Your Ancestors",
//   "Transport",
//   "Horse Riding",
//   "Equestrian",
//   "Coach",
//   "Road",
//   "Pubs and Bar",
//   "Movies",
//   "Cinema",
//   "Pampering",
//   "Health Farm",
//   "Spa and Wellness",
//   "Specialised Retreat",
//   "Fitness and Leisure",
//   "Fast Food",
//   "Cruising",
//   "Bike Rental",
//   "Fishing",
//   "Angling",
//   "Comedy",
//   "Swimming",
//   "Swimming Pools and Water Park",
//   "Swimming Pool",
//   "Sailing",
//   "Cooking",
//   "Cookery",
//   "Learning",
//   "Climbing",
//   "Golf",
//   "Zip Lining",
//   "Marina",
//   "Vegetarian",
//   "Seafood",
//   "Photography",
//   "Sports Venues",
//   "Adventure Park",
//   "Spa",
//   "Agriculture",
//   "Kitesurfing",
//   "Windsurfing",
//   "Surfing",
//   "Artisan",
//   "Food Trails and Tour",
//   "Race Course",
//   "Fine Dining",
//   "Vegan",
//   "Golf Course",
//   "Gardening",
//   "Historic Houses and Castle",
//   "Island",
//   "Offshore Island",
//   "Natural Landscape",
//   "Art Gallery",
//   "Museums and Attraction",
//   "Castle",
//   "Visitor Farm",
//   "Church Abbey",
//   "Monastery",
//   "Churches",
//   "Abbeys and Monastery",
//   "Falconry",
//   "Gardens",
//   "Garden",
//   "Embarkation Point",
//   "River",
//   "Discovery Point",
//   "Ruins",
//   "Literary Ireland",
//   "Zoos and Aquarium",
//   "Public Sculpture",
//   "National Park",
//   "National and Forest Park",
//   "Driving Range",
//   "General",
//   "Golf Driving Range",
//   "Gaa",
//   "Pitch And Putt",
//   "Pitch and Putt",
//   "Beach",
//   "Banquet",
//   "Casinos",
//   "Stadium",
//   "Sports Venue",
// ];
