document.addEventListener("DOMContentLoaded", function () {
  const loaderDiv = document.createElement("div");
  loaderDiv.className = "loader";

  const loaderImg = document.createElement("img");
  loaderImg.src = "/public/images/logo.svg";
  loaderImg.alt = "Loader";

  // Append img to div and div to body
  loaderDiv.appendChild(loaderImg);
  document.body.appendChild(loaderDiv);

  // Function to hide the loader
  function hideLoader() {
    setTimeout(function () {
      loaderDiv.style.display = "none";
    }, 500);
  }

  // Function to show the loader

  // Hide the loader once the page has completely loaded
  window.onload = function () {
    hideLoader();
  };

  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const closeMenu = document.querySelector(".close-menu");

  if (burger && menu && menuOverlay && closeMenu) {
    burger.addEventListener("click", function () {
      menu.classList.add("active");
      menuOverlay.style.display = "block";
    });
    closeMenu.addEventListener("click", function () {
      menu.classList.remove("active");
      menuOverlay.style.display = "none";

      menuOverlay.addEventListener("click", function () {
        menu.classList.remove("active");
        menuOverlay.style.display = "none";
      });

      document.getElementById("year").innerHTML = new Date().getFullYear();
    });
    // Your code that manipulates these elements
    // ...
  } else {
    console.warn("Everything is good!");
  }
});
function toLogin() {
  window.location.href = "/login";
}
function toRegister() {
  window.location.href = "/register";
}
