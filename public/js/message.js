document.addEventListener("DOMContentLoaded", function () {
  // Function to scroll to the bottom
  function scrollToBottom() {
    const chatWindow = document.querySelector(".m-body-holder");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Scroll to the bottom when the DOM is fully loaded
  scrollToBottom();

  // Function to add a new message and scroll to the bottom
  // You can call this function whenever a new message is added to the chat
  window.addNewMessage = function (message) {
    // Your code to add a new message
    // For example, appending the message to the chat window
    const chatWindow = document.querySelector(".m-body-holder");
    const newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);

    // Scroll to the bottom
    scrollToBottom();
  };
});
