import { Router } from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct, getProductByCategory } from "../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:categoria", getProductByCategory)
productsRouter.get("/filtro/:id", getProductById);
productsRouter.post("/", createProduct);
productsRouter.post("/:id", deleteProduct)
productsRouter.post("/updateProduct/:id", updateProduct )


export default productsRouter