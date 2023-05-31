import { ProductRepository } from "../Modules/Products/productsRepository.js";

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
    const products = await ProductRep.find();
    res.json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, category } = req.body;
  const product = { name, price, category };

  if (!name || !price || !category) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const existingProduct = await ProductRep.getProductByFields({ name, price, category });

    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists", data: null });
    }

    const newProduct = await ProductRep.save(product);
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
  export const getProductByCategory = async (req,res) => {
    const {categoria} = req.params
    
   try {
    const products = await ProductRep.getProductByCategory(categoria)
    res.json({data: products })
   } catch (error){
    res.starts(500).json({message: "internal server error", error: error.message})
   }
}



