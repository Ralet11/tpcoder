import { mongoose } from "mongoose";
import { ProductRepository } from "../Products/productsRepository.js";

const Schema = mongoose.Schema;

const CartsSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  deliveryAddress: {
    type: String,
    required: true
  }
});

const CartModel = mongoose.model('CartModel', CartsSchema);

export class CartDAOMongo {
  async createCart(email, dateTime, items, deliveryAddress) {
    const cart = new CartModel({
      email,
      dateTime,
      items,
      deliveryAddress
    });

    await cart.save();
    return cart;
  }

  async getCartById(_id) {
    const cart = await CartModel.findById(_id);
    return cart;
  }

  async getCartItems(cartId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const productIds = cart.items.map(item => item.product);
    const products = await ProductRepository.find({ _id: { $in: productIds } });

    const cartItems = cart.items.map(item => {
      const product = products.find(p => p._id.toString() === item.product.toString());
      return {
        product,
        quantity: item.quantity
      };
    });

    return cartItems;
  }

  async addProductToCart(cartId, productId) {
    let cart = await CartModel.findById(cartId);
  
    if (!cart) {
      // Si no hay un carrito existente, crear uno nuevo
      cart = new CartModel({
        _id: cartId,
        items: [{
          product: productId,
          quantity: 1
        }]
      });
    } else {
      // Verificar si el producto ya está en el carrito
      const existingItem = cart.items.find(item => item.product.toString() === productId.toString());
      if (existingItem) {
        // Si el producto ya está en el carrito, incrementar la cantidad en 1
        existingItem.quantity += 1;
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        cart.items.push({
          product: productId,
          quantity: 1
        });
      }
    }
  
    await cart.save();
    return cart;
  }

  async deleteCart(cartId) {
    const result = await CartModel.findByIdAndDelete(cartId);
    return result;
  }

  async updateCart(cartId, updatedCartData) {
    const cart = await CartModel.findOneAndUpdate(
      { _id: cartId },
      {
        $set: {
          email: updatedCartData.email || cart.email,
          dateTime: updatedCartData.dateTime || cart.dateTime,
          items: updatedCartData.items || cart.items,
          deliveryAddress: updatedCartData.deliveryAddress || cart.deliveryAddress
        }
      },
      { new: true }
    );
  
    if (!cart) {
      throw new Error('Cart not found');
    }
  
    return cart;
  }
}



