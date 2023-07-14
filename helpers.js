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
