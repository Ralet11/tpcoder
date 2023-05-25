import { Router } from "express";
import { getAllProducts, getproductById, createProduct } from "../controllers/controller.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts );
productsRouter.get("/:id", getproductById);
productsRouter.post("/", createProduct);

export default productsRouter