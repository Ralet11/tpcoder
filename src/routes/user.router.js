import { Router } from "express";
import { register, login } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", );
userRouter.put("/", register);
userRouter.post("/", login);

export default userRouter