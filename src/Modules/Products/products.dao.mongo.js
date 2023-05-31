import { mongoose } from "mongoose";

const Schema = mongoose.Schema;

export const ProductDTO = {
  name: '',
  price: 0,
  image: '',
  category: ''
};

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
});

const Products = mongoose.model('Products', ProductsSchema);

export class ProductDAOMongo {
  async getAllProducts() {
    const products = await Products.find();
    return products.map(product => this.mapProductToDTO(product));
  }

  async getProductById(id) {
    const product = await Products.findOne({ _id: id });
    return this.mapProductToDTO(product);
  }
  
  
  async createProduct(product) {
    const validatedProduct = { ...ProductDTO, ...product };
    const newProduct = new Products(validatedProduct);
    await newProduct.save();
    return this.mapProductToDTO(newProduct);
  }

  async getProductByFields(fields) {
    const product = await Products.findOne(fields);
    return this.mapProductToDTO(product);
  }

  async deleteProduct(id) {
    await Products.deleteOne({ _id: id });
    return true;
  }

  async updateProduct(id, product) {
    const updatedProduct = await Products.findByIdAndUpdate({ _id: id }, product, { new: true });
    return this.mapProductToDTO(updatedProduct);
  }

  async getProductByCategory(categoria) {
    const products = await Products.find({category: categoria})
    return products
  }
  

  mapProductToDTO(product) {
    if (!product) {
      return null;
    }

    return {
      id: product.id || '',
      name: product.name || '',
      price: product.price || 0,
      image: product.image || '',
      category: product.category || ''
    };
  }
}
