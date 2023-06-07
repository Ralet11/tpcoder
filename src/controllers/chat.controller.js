import { User } from "./users.controller.js";
import { chatDaoMongo } from "../Modules/Chat/chat.dao.mongo.js";

const chatRep = new chatDaoMongo();

export const renderChat = async (req, res, next) => {
  try {
    const user = await User(req, res);
    res.render("chat.handlebars", { username: user.username, userEmail: user.email });
  } catch (error) {
    next(error); 
  }
};

export const renderPersonalChat = async (req, res, next) => {
  try {
    const email = req.params.email;
    const chats = await chatRep.getChatsByEmail(email);
    res.render("chat-personal.pug", { chats });
  } catch (error) {
    next(error); 
  }
};
