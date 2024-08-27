function setupCustomSelect(containerId, hiddenInputId) {
  const selectContainer = document.getElementById(containerId);
  const selectValue = selectContainer.querySelector(".select-value");
  const selectDropdown = selectContainer.querySelector(".select-dropdown");
  const selectOptions = Array.from(
    selectDropdown.getElementsByClassName("select-option")
  );
  const hiddenInput = document.getElementById(hiddenInputId);
  const isMultiSelect = selectContainer.classList.contains("multi-select");
  const isDisabled = selectContainer.classList.contains("disabled");
  const selectPad = document.querySelector(".spd");

  if (isDisabled) {
    selectContainer.classList.add("disabled");
    selectContainer.removeEventListener("click", toggleDropdown);
  } else {
    selectContainer.addEventListener("click", toggleDropdown);
  }

  function toggleDropdown() {
    selectDropdown.classList.toggle("open");

    // Check if selectPad exists before modifying its style
    if (selectPad) {
      if (selectDropdown.classList.contains("open")) {
        selectPad.style.paddingBottom = "150px";
      } else {
        selectPad.style.paddingBottom = "0px";
      }
    } else {
      console.warn("selectPad element not found.");
    }
  }

  selectOptions.forEach((option) => {
    option.addEventListener("click", function (event) {
      event.stopPropagation();
      const value = this.getAttribute("data-value");
      const text = this.textContent;
      if (isMultiSelect) {
        this.classList.toggle("selected");
        updateMultiSelectValue(selectOptions, selectValue, hiddenInput);
      } else {
        selectOptions.forEach((option) => {
          option.classList.remove("selected");
        });
        this.classList.add("selected");
        selectValue.textContent = text;
        hiddenInput.value = value;
        selectDropdown.classList.remove("open");
        selectValue.classList.add("dark");
        document.body.style.paddingBottom = "0px";
      }

      // Dispatch a custom event
      const customEvent = new Event("customSelectChange", {
        bubbles: true,
        cancelable: true,
      });
      hiddenInput.dispatchEvent(customEvent);
    });
  });
}

function updateSingleSelectValue(selectOptions, selectValue, hiddenInput) {
  selectOptions.forEach((option) => {
    option.classList.remove("selected");
  });

  selectValue.textContent = "Select";
  selectValue.removeAttribute("data-value");
  hiddenInput.value = "";
}

function updateMultiSelectValue(selectOptions, selectValue, hiddenInput) {
  const selectedOptions = selectOptions.filter((option) =>
    option.classList.contains("selected")
  );
  const selectedValues = selectedOptions.map((option) =>
    option.getAttribute("data-value")
  );
  const selectedTexts = selectedOptions.map((option) => option.textContent);
  selectValue.innerHTML = "";

  if (selectedTexts.length > 0) {
    selectedTexts.forEach((text) => {
      const tag = document.createElement("span");
      tag.classList.add("tag");
      tag.textContent = text;
      selectValue.appendChild(tag);
    });
  } else {
    selectValue.textContent = "Select";
  }

  hiddenInput.value = selectedValues.join(",");
}

function addTagToHiddenInput(value, hiddenInput) {
  const currentTags = hiddenInput.value.split(",");
  currentTags.push(value);
  hiddenInput.value = currentTags.filter((tag) => tag !== "").join(",");
}

function removeTagFromHiddenInput(value, hiddenInput) {
  const currentTags = hiddenInput.value.split(",");
  const updatedTags = currentTags.filter((tag) => tag !== value);
  hiddenInput.value = updatedTags.join(",");
}

// Rest of the code for addTagToHiddenInput, removeTagFromHiddenInput, and updateSelectValue functions...
