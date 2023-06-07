import { Router } from "express";
import { addProductToCart, deleteCart, deleteCartItem, updateCartItem, getCart, renderCart } from "../controllers/cart.controller.js"; 
import { authenticateToken } from "../middleware/authenticationJWT.js";

const cartRouter = Router();

cartRouter.get("/carrito/actual", authenticateToken, getCart)
cartRouter.get("/carrito", authenticateToken, renderCart);
cartRouter.post("/carrito", authenticateToken, addProductToCart);
cartRouter.delete("/carrito", authenticateToken, deleteCart);
cartRouter.delete("/carrito:id", authenticateToken, deleteCartItem)
cartRouter.post("/carrito:id", authenticateToken, updateCartItem )

export default cartRouter