import { ProductRepository } from "../Modules/Products/productsRepository.js";

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
    const existingProduct = await ProductDao.findOne(id);

    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists", data: null });
    }

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
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  if (!id || !name || !price || !category) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const existingProduct = await ProductDao.findOne(id);

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
};


