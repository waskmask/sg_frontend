// Select elements
const profileDDItem = document.querySelector(".profile-dd-item");
const profileDropdown = document.querySelector(".profile-dropdown");

// Flag to check if toggle should happen
let shouldToggle = false;

// Function to toggle active class
const toggleActiveClass = () => {
  shouldToggle = true;
  profileDropdown.classList.toggle("active");
};

// Add click event to .profile-dd-item
profileDDItem.addEventListener("click", toggleActiveClass);

// Function to handle outside clicks
const handleOutsideClick = (event) => {
  if (shouldToggle) {
    // Reset the flag
    shouldToggle = false;
    return;
  }
  if (!profileDropdown.contains(event.target)) {
    profileDropdown.classList.remove("active");
  }
};

// Listen for clicks on the document
document.addEventListener("click", handleOutsideClick);

document.getElementById("year").innerHTML = new Date().getFullYear();

function toMessage() {
  window.location.href = "/messages";
}
