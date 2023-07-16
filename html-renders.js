import { isFavouritedActivity } from "./helpers";

// Creates the HTML for an activity
export function createActivityHTML(activity) {
  //Create the activity element
  const activityElement = document.getElementById("activity");

  //Create the activity list
  const activityList = document.createElement("ul");
  activityList.classList.add("activity-list");

  let activityListStringArray = ['<ul class="activity-list">'];

  //Append indivdual activity to list array, max of 5 results
  activity.tags.forEach((element, index) => {
    if (index > 5) return;
    const html = `<li>${element}</li>`;
    activityListStringArray.push(html);
  });

  //   Join array into large string
  activityListStringArray = activityListStringArray.join("") + "</ul>";

  //Create inner html for the activity element

  const isFavourited = isFavouritedActivity(activity);

  const html = `
      <h3 class="activity-name">${activity.name}</h3>
      <h4 class="activity-location">${activity.region}</h4>
     ${activityListStringArray}
     <div class="activity-links">
      <button class="favourite-btn btn-flat ${isFavourited && "favourite"}">
        <i class="fa-solid fa-heart"></i>
      </button>
        <a href=${activity.url}
        alt="Link to ${activity.name} website"
        target="_blank" class="fly-btn btn-flat">
        <i class="fa-solid fa-globe"></i>
        </a>
      </div>`;

  // Add inner html to activity element
  activityElement.innerHTML = html;

  return activityElement;
}
