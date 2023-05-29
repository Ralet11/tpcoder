import { Router } from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from "../controllers/Product.controller.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", createProduct);
productsRouter.post("/:id", deleteProduct)
productsRouter.post("/updateProduct/:id", updateProduct )

export default productsRouter