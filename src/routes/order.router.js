import { Router } from "express";
import { authenticateToken } from "../middleware/authenticationJWT.js";
import { createOrder, renderOrder } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.get("/order", authenticateToken, createOrder)
ordersRouter.get("/order/:id", authenticateToken, renderOrder)

export default ordersRouter