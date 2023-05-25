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
    const { name, price, image, category } = req.body;
    const _product = { name, price, image, category };
    if (!id || !name || !price || !image || !category) {
     return res.status(400).json({ message: "Bad request", data: null });
   }
   const existe = await Products.findOne(id);
   if (existe) {
     return res.status(409).json({ message: "Product already exists", data: null });
   }

   const product = await Products.bulkSave(_product)
   return res.status(201).json({ data: product, message: "Product has been created" });

  };