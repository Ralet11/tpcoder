import { Router } from "express";
import { register, login, getUser, logout } from "../controllers/users.controller.js";
import path from "path";
import { fileURLToPath } from "url";
import { authenticateToken } from "../middleware/authenticationJWT.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.render(path.join(__dirname, "../views/index.pug"));
  });
userRouter.post("/register", register);
userRouter.post("/", login);
userRouter.get("/user", getUser);
userRouter.get("/user/logout", authenticateToken, logout)

export default userRouter