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
        userMessage.toLowerCase().includes("hola") ||
        userMessage.toLowerCase().includes("saludos")
      ) {
        response = "¡Hola! ¿En qué puedo ayudarte hoy?";
      } else if (userMessage.toLowerCase().includes("gracias")) {
        response = "¡De nada! Estoy aquí para ayudar.";
      } else if (userMessage.toLowerCase().includes("ayuda")) {
        response =
          "Estoy aquí para responder tus preguntas y asistirte con información. ¿Sobre qué tema necesitas ayuda?";
      } else {
        response =
          "Gracias por tu mensaje. ¿Hay algo más en lo que pueda ayudarte?";
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
      addMessage(`Imagen adjunta: ${fileName}`, "user");

      // Simulate a response acknowledging the image
      setTimeout(() => {
        addMessage(
          "He recibido tu imagen. ¿En qué puedo ayudarte con ella?",
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
      addMessage(`Archivo adjunto: ${fileName}`, "user");

      // Simulate a response acknowledging the file
      setTimeout(() => {
        addMessage(
          "He recibido tu archivo. ¿Qué necesitas hacer con él?",
          "assistant"
        );
      }, 1000);

      // Reset the input
      this.value = "";
    }
  });
});
