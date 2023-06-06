import { Router } from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct, getProductsByCat } from "../controllers/product.controller.js";
import { authenticateToken } from "../middleware/authenticationJWT.js";


const productsRouter = Router();

productsRouter.get("/", authenticateToken, getAllProducts);
productsRouter.get("/:categoria", authenticateToken, getProductsByCat)
productsRouter.get("/filtro/:id", authenticateToken, getProductById);
productsRouter.post("/", createProduct);
productsRouter.post("/prod/:id", authenticateToken, deleteProduct)
productsRouter.post("/updateProduct/:id", updateProduct )


export default productsRouter