/*jshint esversion: 6 */


// Buttons controls
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "submit-button") {
                alert("You clicked button");
                return;
            }
        })
    }
});