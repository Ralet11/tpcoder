import { Router } from "express";
import { register, login } from "../controllers/users.controller.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.render(path.join(__dirname, "../views/index.pug"));
  });
userRouter.put("/", register);
userRouter.post("/", login);

export default userRouter