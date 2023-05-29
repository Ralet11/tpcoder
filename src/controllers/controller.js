import { ProductRepository } from "./../Modules/productsRepository.js";

const ProductDao = new ProductRepository

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductDao.findOne(id);
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductDao.find();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, category, id } = req.body;
  const product = { name, price, category, id };

  if (!id || !name || !price || !category) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const newProduct = await ProductDao.save(product);
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
    const result = await ProductDao.delete(id);
    if (result) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
