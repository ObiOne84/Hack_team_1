/*jshint esversion: 6 */

/**
 * Function add event listener and awaits for submit event
 * and checks the form input for content
 * if input is provided, function display thank you note
 * to the user
 */
let contactForm = document.getElementById("form-container");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let form = document.getElementById("form-container");
  form.style.display = "none";
  let thankYouMessage = document.getElementById("thank-you-note");
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("exampleInputPassword1").value;
  let email = document.getElementById("exampleInputEmail1").value;

  if (fname !== "" && lname !== "" && email !== "") {
    thankYouMessage.style.display = "block";
  } else {
    console.log("User did not provide valid creditentials.");
  }
});
