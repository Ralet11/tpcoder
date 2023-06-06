$(function() {
    const socket = io();
  
    const chatForm = $("#chat-form");
    const chatText = $("#message-input");
    const chatMessages = $("#chat-messages");
  
    chatForm.on("submit", e => {
      e.preventDefault();
      const message = chatText.val();
      socket.emit("send message", message); // Envía el mensaje al servidor
      chatText.val("");
    });
  
    socket.on("new message", function(data) {
      chatMessages.append(data + "<br>"); // Agrega el mensaje con salto de línea
    });
  });
  
  