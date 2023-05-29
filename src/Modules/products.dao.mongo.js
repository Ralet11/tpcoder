import { Products } from "../Schema/schema.js";

export class ProductDAOMongo {
  async getAllProducts() {
    return await Products.find();
  }

  async getProductById(id) {
    return await Products.findOne({id});
  }
  
  async createProduct(product) {
    const newProduct = new Products(product);
    await newProduct.save();
    return newProduct;
  }

  async deleteProduct(id) {
    await Products.deleteOne({ id });
    return true;
  }
}