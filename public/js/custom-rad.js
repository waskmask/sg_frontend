document.addEventListener("DOMContentLoaded", function () {
  function setupCustomRad(customRad) {
    const dropDown = customRad.querySelector(".drop-down");
    const selectedLabel = customRad.querySelector(".label.selected");

    // Toggle drop-down display
    customRad.addEventListener("click", function () {
      if (dropDown.classList.contains("show")) {
        dropDown.classList.remove("show");
        setTimeout(() => {
          dropDown.style.display = "none";
        }, 300); // Match the transition duration
      } else {
        dropDown.style.display = "block";
        setTimeout(() => {
          dropDown.classList.add("show");
        }, 0);
      }
    });

    dropDown.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Update selected label
    const radioInputs = customRad.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((input) => {
      input.addEventListener("change", function () {
        const value = this.nextElementSibling.textContent;
        selectedLabel.innerHTML = value;

        // Close the dropdown when a radio button is selected
        dropDown.classList.remove("show");
        setTimeout(() => {
          dropDown.style.display = "none";
        }, 300); // Match the transition duration

        if (this.classList.contains("any")) {
          // Remove the remove-item span if it exists
          const removeItem = selectedLabel.querySelector(".remove-item");
          const submitButton = document.getElementById("filterSubmitBtn");
          if (removeItem) {
            selectedLabel.removeChild(removeItem);
          }
        } else {
          const removeItem = document.createElement("span");
          removeItem.className = "remove-item material-symbols-rounded";
          removeItem.textContent = "cancel";

          // Add click event to remove item
          removeItem.addEventListener("click", function (e) {
            e.stopPropagation(); // Prevent triggering the customRad click event
            if (submitButton) {
              submitButton.click();
            }
            const anyRadio = customRad.querySelector('input[class="any"]');
            const anyLabel = anyRadio.nextElementSibling.textContent;
            selectedLabel.innerHTML = anyLabel;
            anyRadio.checked = true; // Select the "Any" radio
            updateCountAndReset();
          });

          selectedLabel.appendChild(removeItem);
        }
      });
    });
  }

  // Initialize all custom radio dropdowns
  const customRads = document.querySelectorAll(".custom-rad");
  customRads.forEach(setupCustomRad);
});
