import { chatDaoMongo } from "./Modules/Chat/chat.dao.mongo.js";

export const SocketIO = (io) => {
  const connectedUsers = []; // Objeto para almacenar los usuarios conectados
  const chatDao = new chatDaoMongo();

  io.on("connection", async (socket) => {
   
    io.on("connection", async (socket) => {
      try {
        const oldChats = await chatDao.getAllChats();
        socket.emit("old chats", oldChats); // Emite el evento "old chats" al cliente con los mensajes antiguos
      } catch (error) {
        console.error("Error al obtener los chats:", error);
        socket.emit("error", "Error al obtener los chats");
      }
    
      // Resto del código de conexión y eventos...
    });
    
  
    socket.on("join", (email) => {
      const user = { id: socket.id, email, socket }; // Crea un objeto con el id del socket y el email del usuario
      connectedUsers.push(user); // Agrega el usuario al array de usuarios conectados
      io.emit("user joined", connectedUsers.map((user) => user.email)); // Emite el evento "user joined" con la lista de emails de los usuarios conectados
    });

    // Cuando un usuario se desconecta
    socket.on("disconnect", () => {
      const index = connectedUsers.findIndex((user) => user.id === socket.id); // Busca el índice del usuario desconectado en el array
      if (index !== -1) {
        connectedUsers.splice(index, 1); // Elimina el usuario del array de usuarios conectados
        io.emit("user left", connectedUsers.map((user) => user.email)); // Emite el evento "user left" con la lista de emails de los usuarios conectados
      }
    });

    // Cuando se recibe un mensaje
    socket.on("send message", async (message) => {
      const user = connectedUsers.find((user) => user.id === socket.id);
      const username = user ? user.email : null;

      let msg = message.trim();

      const privateMessagePattern = /^\/p\s+(\S+)\s+(.*)$/;
      const privateMessageMatch = msg.match(privateMessagePattern);

      if (privateMessageMatch) {
        const name = privateMessageMatch[1];
        const content = privateMessageMatch[2];
        const recipientSocket = connectedUsers.find((user) => user.email === name)?.socket;

        if (recipientSocket) {
          // Envía el mensaje privado al destinatario correspondiente
          recipientSocket.emit("private message", { sender: username, message: content });
        } else {
          // Destinatario no encontrado o no está conectado, realiza alguna acción de manejo de errores
          socket.emit("error", "El destinatario no está disponible");
        }
      } else {
        await chatDao.saveChat(username, msg);
        io.emit("new message", { username, message: msg }); // Emite el evento "new message" para enviar el mensaje a todos los clientes conectados
      }
    });
  });
};
