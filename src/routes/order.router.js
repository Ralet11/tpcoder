import { Router } from "express";
import { authenticateToken } from "../middleware/authenticationJWT.js";
import { createOrder, renderOrder } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.get("/order", createOrder)
ordersRouter.get("/order/:id", renderOrder)

export default ordersRouter