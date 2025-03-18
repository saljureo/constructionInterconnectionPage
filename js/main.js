document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("sendButton");
  const userInput = document.getElementById("userInput");
  const chatHistory = document.getElementById("chatHistory");
  const attachImageBtn = document.getElementById("attachImageBtn");
  const attachFileBtn = document.getElementById("attachFileBtn");
  const imageInput = document.getElementById("imageInput");
  const fileInput = document.getElementById("fileInput");

  // Function to add a message to the chat history
  function addMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);

    const messageContent = document.createElement("p");
    messageContent.textContent = message;

    messageDiv.appendChild(messageContent);
    chatHistory.appendChild(messageDiv);

    // Scroll to the bottom of the chat history
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  // Function to simulate an assistant response
  function simulateResponse(userMessage) {
    // Simple response logic - in a real app, this would be connected to a backend
    setTimeout(() => {
      let response;

      if (
        userMessage.toLowerCase().includes("hello") ||
        userMessage.toLowerCase().includes("hi")
      ) {
        response = "Hello! How can I help you find the right contractor today?";
      } else if (
        userMessage.toLowerCase().includes("thanks") ||
        userMessage.toLowerCase().includes("thank you")
      ) {
        response = "You're welcome! I'm here to help.";
      } else if (userMessage.toLowerCase().includes("help")) {
        response =
          "I'm here to help you find the right contractors for your construction needs. What type of service are you looking for?";
      } else {
        response =
          "Thank you for your message. Is there anything else I can help you with?";
      }

      addMessage(response, "assistant");
    }, 1000);
  }

  // Function to handle sending a message
  function sendMessage() {
    const message = userInput.value.trim();

    if (message) {
      addMessage(message, "user");
      userInput.value = "";

      // Auto-resize textarea back to default
      userInput.style.height = "80px";

      // Simulate response
      simulateResponse(message);
    }
  }

  // Event listener for the send button
  sendButton.addEventListener("click", sendMessage);

  // Event listener for Enter key (but allow Shift+Enter for new lines)
  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea as user types
  userInput.addEventListener("input", function () {
    this.style.height = "80px";
    this.style.height =
      (this.scrollHeight > 80 ? this.scrollHeight : 80) + "px";
  });

  // Handle image attachment
  attachImageBtn.addEventListener("click", function () {
    imageInput.click();
  });

  imageInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      const file = this.files[0];

      // In a real app, you would upload the file to a server
      // Here we just show a message that the file was attached
      const fileName = file.name;
      addMessage(`Image attached: ${fileName}`, "user");

      // Simulate a response acknowledging the image
      setTimeout(() => {
        addMessage(
          "I've received your image. How can I help you with it?",
          "assistant"
        );
      }, 1000);

      // Reset the input
      this.value = "";
    }
  });

  // Handle file attachment
  attachFileBtn.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      const file = this.files[0];

      // In a real app, you would upload the file to a server
      // Here we just show a message that the file was attached
      const fileName = file.name;
      addMessage(`File attached: ${fileName}`, "user");

      // Simulate a response acknowledging the file
      setTimeout(() => {
        addMessage(
          "I've received your file. What would you like to do with it?",
          "assistant"
        );
      }, 1000);

      // Reset the input
      this.value = "";
    }
  });
});
