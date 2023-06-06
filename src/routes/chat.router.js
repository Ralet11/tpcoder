import { Router } from "express";
import { renderChat, renderPersonalChat } from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.get("/chat", renderChat)
chatRouter.get("/chat/:email", renderPersonalChat)

export default chatRouter