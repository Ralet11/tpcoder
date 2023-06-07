import { Router } from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct, getProductsByCat } from "../controllers/product.controller.js";
import { authenticateToken } from "../middleware/authenticationJWT.js";


const productsRouter = Router();

productsRouter.get("/", authenticateToken, getAllProducts);
productsRouter.get("/:categoria", authenticateToken, getProductsByCat)
productsRouter.get("/id/:id", authenticateToken, getProductById);
productsRouter.post("/", authenticateToken, createProduct);
productsRouter.post("/:id", authenticateToken, deleteProduct)
productsRouter.post("/updateProducto/:id", authenticateToken, updateProduct )


export default productsRouter