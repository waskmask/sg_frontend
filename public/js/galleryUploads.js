document.addEventListener("DOMContentLoaded", () => {
  const galleryInput = document.getElementById("galleryInput");
  const uploadedImagesDiv = document.querySelector(".uploaded-images");

  function setSquareImg() {
    const imageItems = document.querySelectorAll(".image-item img");

    imageItems.forEach((imageItem) => {
      const width = imageItem.offsetWidth;
      imageItem.style.height = `${width}px`;
    });
  }

  galleryInput.addEventListener("change", async (event) => {
    console.log("event.target.files");
    console.log(event.target.files);
    const files = event.target.files;
    const privacy = document.querySelector(
      'input[name="privacy"]:checked'
    ).value;

    if (files.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const formData = new FormData();
    formData.append("privacy", privacy);

    for (const file of files) {
      formData.append("image", file);
    }

    try {
      const response = await fetch("/uploadImages", {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);
        alert(data.message);
        // Add uploaded images to the DOM
        if (Array.isArray(data.images)) {
          for (const image of data.images) {
            const imageDiv = document.createElement("div");
            imageDiv.className = "image-item";
            imageDiv.setAttribute("data-id", image.uuid);
            imageDiv.innerHTML = `
              <img src="${image.url}" alt="image" />
              <div class="action">
                <button class="btn delete" data-image-id="${image.uuid}">
                  <span class="material-symbols-rounded"> close </span>
                </button>
              </div>
            `;
            uploadedImagesDiv.appendChild(imageDiv);

            setSquareImg();
          }
        } else {
          console.error("data.images is not an array");
        }
        alert("Images uploaded successfully.");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  });

  // gallery delete image
  // Add event listener to all delete buttons
  const deleteButtons = document.querySelectorAll(".btn.delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation(); // Prevent event from being triggered twice
      const imageId = event.target
        .closest("button")
        .getAttribute("data-image-id");
      const confirmed = window.confirm(
        "Are you sure you want to delete this image?"
      );
      if (confirmed) {
        try {
          const response = await axios.delete(`/deleteImage/${imageId}`);
          if (response.status === 200) {
            // Remove the image element from the DOM
            event.target.closest(".image-item").remove();
            alert("Image deleted successfully.");
          } else {
            alert("Failed to delete image.");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    });
  });
  // gallery delete image
});
