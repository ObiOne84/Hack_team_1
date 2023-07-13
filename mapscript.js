import attractionMarkerImage from "./assets/images/attraction-marker.png";

export const attractionMarkerIcon = L.icon({
  iconUrl: attractionMarkerImage,
  iconSize: [40, 40], // Set the size of the icon
  iconAnchor: [16, 32], // Set the anchor point of the icon
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
