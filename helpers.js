// Takes an array and returns a random 3 items from it
export function randomThreeFromArray(array) {
  let randomItems = [];

  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    randomItems.push(array.splice(randomIndex, 1)[0]);
  }

  return randomItems;
}

// Creates the HTML for an activity
export function createActivityHTML(activity) {
  //Create the activity element
  const activityElement = document.createElement("div");
  activityElement.classList.add("activity");

  //Create the activity list
  const activityList = document.createElement("ul");
  activityList.classList.add("activity-list");

  let activityListStringArray = ['<ul class="activity-list">'];

  //Append indivdual activity to list array
  activity.tags.forEach((element) => {
    const html = `<li>${element}</li>`;
    activityListStringArray.push(html);
  });

  //   Join array into large string
  activityListStringArray = activityListStringArray.join("") + "</ul>";

  //Create inner html for the activity element
  const html = `
    <h2 class="activity-name">${activity.name}</h2>
    <h3 class="activity-location">${activity.address.addressRegion}</h3>
    <h3>Type:</h3>
   ${activityListStringArray}
    <a
      href=${activity.url}
      alt="Link to ${activity.name} website"
      target="_blank"
      >Visit Site</a
    >`;

  // Add inner html to activity element
  activityElement.innerHTML = html;

  return activityElement;
}
