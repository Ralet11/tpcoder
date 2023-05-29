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
  id: {
    type: Number,
    required: true
  }
});

const Products = mongoose.model('Products', ProductsSchema);

export class ProductDAOMongo {
  async getAllProducts() {
    const products = await Products.find();
    return products.map(product => this.mapProductToDTO(product));
  }

  async getProductById(id) {
    const product = await Products.findOne({ id });
    return this.mapProductToDTO(product);
  }
  
  async createProduct(product) {
    const validatedProduct = { ...ProductDTO, ...product };
    const newProduct = new Products(validatedProduct);
    await newProduct.save();
    return this.mapProductToDTO(newProduct);
  }

  async deleteProduct(id) {
    await Products.deleteOne({ id });
    return true;
  }

  async updateProduct(id, product) {
    const updatedProduct = await Products.findByIdAndUpdate(id, product, { new: true });
    return this.mapProductToDTO(updatedProduct);
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
