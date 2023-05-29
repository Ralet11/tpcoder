import { Router } from "express";
import { getCartById, getCartItems, addProductToCart, deleteCart, updateCart } from "../controllers/cart.controller.js"; 

const cartRouter = Router();

cartRouter.get("/carrito", getCartItems);
cartRouter.get("/carrito:id", getCartById);
cartRouter.post("/carrito", addProductToCart);
cartRouter.delete("/carrito:id", deleteCart);
cartRouter.put("/carrito:id", updateCart )

export default cartRouter