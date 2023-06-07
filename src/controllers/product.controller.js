import { ProductRepository } from "../Modules/Products/productsRepository.js";
import axios from "axios";
import fs from 'fs';
import { User } from "./users.controller.js";

const ProductRep = new ProductRepository();

export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductRep.findOne(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    next(error); 
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const _user = await User(req, res);
    const products = await ProductRep.find();
    res.render('products.pug', { products, _user });
  } catch (error) {
    next(error); 
  }
};

export const getProductsByCat = async (req, res, next) => {
  const { categoria } = req.params;
  try {
    const _user = await User(req, res);
    const products = await ProductRep.getProductByCategory(categoria);
    res.render("productosCategoria.pug", { products, _user });
  } catch (error) {
    next(error); 
  }
};

export const createProduct = async (req, res, next) => {
  const { name, price, category, image } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const existingProduct = await ProductRep.getProductByFields({ name, price, category });

    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists", data: null });
    }

    const newProduct = await ProductRep.save({ name, price, category, image });

    // Descargar la imagen desde la URL y guardarla en public/imagenes
    const response = await axios.get(image, { responseType: 'arraybuffer' });
    const imagePath = `public/imagenes/${newProduct.id}.jpg`;
    fs.writeFileSync(imagePath, response.data);

    res.status(201).json({ data: newProduct, message: "Product has been created" });
  } catch (error) {
    next(error); 
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const result = await ProductRep.delete(id);
    if (result) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error); 
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  if (!id || !name || !price || !category) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const existingProduct = await ProductRep.findOne({ _id: id });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found", data: null });
    }

    existingProduct.name = name;
    existingProduct.price = price;
    existingProduct.category = category;

    await ProductRep.save(existingProduct);
    res.json({ data: existingProduct, message: "Product updated successfully" });
  } catch (error) {
    next(error); 
  }
};




