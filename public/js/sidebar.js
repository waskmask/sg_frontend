document.addEventListener("DOMContentLoaded", function () {
  const sideBar = document.querySelector(".sidebar");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const appOverlay = document.querySelector(".app-overlay");

  if (sideBar && toggleSidebar && appOverlay) {
    toggleSidebar.addEventListener("click", function () {
      sideBar.classList.toggle("active");
      appOverlay.classList.toggle("d-block");
    });
  }
  function closeSideBar() {
    sideBar.classList.remove("active");
    appOverlay.classList.remove("d-block");
  }
  closeSidebar.addEventListener("click", closeSideBar);
  appOverlay.addEventListener("click", closeSideBar);
});
