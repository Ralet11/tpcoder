import { Router } from "express";
import { getCartItems, addProductToCart, deleteCart, deleteCartItem, updateCartItem } from "../controllers/cart.controller.js"; 

const cartRouter = Router();

cartRouter.get("/carrito", getCartItems);
cartRouter.post("/carrito", addProductToCart);
cartRouter.delete("/carrito", deleteCart);
cartRouter.delete("/carrito:id", deleteCartItem)
cartRouter.post("/carrito:id", updateCartItem )

export default cartRouter