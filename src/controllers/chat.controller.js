import { User } from "./users.controller.js"
import { chatDaoMongo } from "../Modules/Chat/chat.dao.mongo.js"

const chatRep = new chatDaoMongo

export const renderChat = async (req,res) => {
    const user = await User(req, res)
    res.render("chat", {user})
}

export const renderPersonalChat = async (req, res) => {
    const email = req.params.email
    const chats = await chatRep.getChatsByEmail(email)
    console.log(chats)
    res.render("chat-personal", {chats})
}