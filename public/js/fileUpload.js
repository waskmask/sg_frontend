document.addEventListener("DOMContentLoaded", () => {
  const fileUploader = document.querySelector(".file-uploader");
  const fileInput = document.getElementById("galleryInput");
  const uploadedImages = document.querySelector(".uploaded-images");

  // Initialize Sortable.js
  new Sortable(uploadedImages, {
    handle: ".image-item", // Drag handle selector within list items
    dragClass: "sortable-drag", // Class name for the dragged item while being dragged
    onEnd: async function (/**Event*/ evt) {
      const sortedIDs = Array.from(
        uploadedImages.querySelectorAll(".image-item")
      ).map((item) => item.getAttribute("data-id"));

      // Now you can send `sortedIDs` to the server to update the order
      axios
        .patch("/updateImageOrder", { sortedIDs })
        .then((response) => {
          if (response.status === 200) {
            console.log("Order updated successfully");
            console.log("Sorted IDs:", sortedIDs);
          } else {
            console.log("Failed to update order");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    },
  });

  function setSquare() {
    const imageItems = document.querySelectorAll(".image-item img");

    imageItems.forEach((imageItem) => {
      const width = imageItem.offsetWidth;
      imageItem.style.height = `${width}px`;
    });
  }

  setSquare();
  window.addEventListener("resize", setSquare);

  fileUploader.addEventListener("click", () => {
    fileInput.click();
  });

  function bindEventsToImageItem(imageItem) {
    if (imageItem === null) {
      console.error("Image item is null");
      return;
    }

    const deleteButton = imageItem.querySelector(".delete");

    if (deleteButton === null) {
      console.error("Delete button is null");
      return;
    }

    deleteButton.addEventListener("click", handleDelete);
    deleteButton.addEventListener("touchstart", handleDelete);
  }

  const initialImageItems = document.querySelectorAll(".image-item");

  initialImageItems.forEach(bindEventsToImageItem);

  // fileInput.addEventListener("change", function () {
  //   const files = Array.from(this.files);
  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const imageItem = document.createElement("div");
  //       imageItem.className = "image-item";
  //       imageItem.innerHTML = `<img src="${e.target.result}" alt="image" />
  //             <div class="action">
  //               <button class="btn delete">
  //                 <span class="material-symbols-rounded">close</span>
  //               </button>
  //             </div>`;
  //       uploadedImages.appendChild(imageItem);
  //       bindEventsToImageItem(imageItem);
  //       setSquare();
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // });

  function handleDelete(e) {
    e.preventDefault();
    const imageItem = e.target.closest(".image-item");
    // alert("Are you sure you want to delete this image?");
    imageItem.remove();
  }
});
