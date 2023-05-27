import { Products, ProductDTO } from "../Schema/schema.js";

export const getproductById = async (req,res) => {
    const { id } = req.params;
    const product = await Products.findById(id)
    res.json({data: product})
}

export const getAllProducts = async (req, res) => {
    const products = await Products.find()
}

export const createProduct = async (req, res) => {
    const { name, price, category, id } = req.body;
    console.log({ name, price, category, id})
    const _product = { name, price, category, id }
    if (!id || !name || !price || !category) {
     return res.status(400).json({ message: "Bad request", data: null });
   }
   const existe = await Products.findOne({id});
   if (existe) {
     return res.status(409).json({ message: "Product already exists", data: null });
   }

   const product = new Products(_product);
  try {
    const savedProduct = await product.save();
    return res.status(201).json({ data: savedProduct, message: "Product has been created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }

  };

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Bad request", data: null });
    }
    try {
      const deletedProduct = await Products.findOneAndDelete({ id: id });
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

  export const updateProduct = async (req, res) => {
    const { name, price, category, id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Bad request", data: null });
    }

  const upProduct = Products.findByIdAndUpdate({id: id})
  


  }