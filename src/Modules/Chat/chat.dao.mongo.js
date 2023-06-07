import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

const Chats = mongoose.model("Chats", chatModel);

export class chatDaoMongo {
  async saveChat(name, msg) {
    const _msg = new Chats({ name, msg }); 
    await _msg.save(); 
  }

  async getAllChats() {
    try {
      const chats = await Chats.find();
      return chats.length > 0 ? chats : null;
    } catch (error) {
      console.error("Error al obtener los chats:", error);
      throw error;
    }
  }
  

  async getChatsByEmail(email){
    try {
        const userChats = await Chats.find({ name: email });
        return userChats
      
      } catch (error) {
        console.log(error.message)
      }
  }
}
