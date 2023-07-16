/*jshint esversion: 6 */

// Wait for DOM to finish
// Get button elements and add event listener to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "submit-button") {
                displayThankYouMessage();
                return;
            }
        })
    }
});


/**
 * Function check the form input for content
 * if input is provided, function display thank you note
 * to the user
 */
function displayThankYouMessage() {
    let thankYouMessage = document.getElementById("thank-you-note"); 
    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("exampleInputPassword1").value.trim();
    let email = document.getElementById("exampleInputEmail1").value.trim();
   
    if (fname !== "" && lname !== "" && email !== "") {
        thankYouMessage.style.display = "block"
    }
}