import { ProductRepository } from "../Modules/Products/productsRepository.js";
import axios from "axios";
import fs from 'fs';
import { User } from "./users.controller.js";

const ProductRep = new ProductRepository

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductRep.findOne(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const _user = await User(req, res)
    const products = await ProductRep.find();
    res.render('products', { products, _user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getProductsByCat = async (req, res) => {
  const { categoria } = req.params;
  console.log(categoria);
  try {
    const _user = await User(req, res);
    const products = await ProductRep.getProductByCategory(categoria);
    console.log(products, _user);
    res.render("productosCategoria", { products, _user });
  } catch (error) {
    console.log(error);
  }
};


export const createProduct = async (req, res) => {
  const { name, price, category, image } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const existingProduct = await ProductRep.getProductByFields({ name, price, category });

    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists", data: null });
    }

    // Guardar el producto en la base de datos
    const newProduct = await ProductRep.save({ name, price, category, image });
    

    // Descargar la imagen desde la URL y guardarla en public/imagenes
    const response = await axios.get(image, { responseType: 'arraybuffer' });
    const imagePath = `public/imagenes/${newProduct.id}.jpg`;
    fs.writeFileSync(imagePath, response.data);

    res.status(201).json({ data: newProduct, message: "Product has been created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
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
    res.status(500).json({ message: "Internal server error", error: error.message });
  }

  
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  if (!id || !name || !price || !category) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const existingProduct = await ProductRep.findOne(id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found", data: null });
    }

    existingProduct.name = name;
    existingProduct.price = price;
    existingProduct.category = category;

    await existingProduct.save();
    res.json({ data: existingProduct, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }

}
 



