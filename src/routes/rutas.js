import { Router } from "express";
import { getAllProducts, getproductById, createProduct, deleteProduct } from "../controllers/controller.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts );
productsRouter.get("/:id", getproductById);
productsRouter.post("/", createProduct);
productsRouter.post("/:id", deleteProduct)

export default productsRouter