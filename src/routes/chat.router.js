import { Router } from "express";
import { renderChat, renderPersonalChat } from "../controllers/chat.controller.js";
import { authenticateToken } from "../middleware/authenticationJWT.js";

const chatRouter = Router()

chatRouter.get("/chat", authenticateToken, renderChat)
chatRouter.get("/chat/:email", authenticateToken, renderPersonalChat)

export default chatRouter