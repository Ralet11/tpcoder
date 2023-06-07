import mongoose from "mongoose";
import { getItems } from "../../controllers/cart.controller.js";

const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    orderNumber: {
      type: Number,
      required: true
    },
  
    dateTime: {
      type: Date,
      required: true
    },
  
    items: [
      {
        product: {
          type: Schema.Types.Mixed, // Cambio de String a Mixed
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
  
    priceTotal: {
      type: Number,
      required: true
    },

    email: {
        type: String,
        required: true
    }
  });
  

const Orders = mongoose.model("Orders", OrdersSchema);

export class OrdersDaoMongo {
  async createOrder(_cart, items) {
    
    const dateTime = _cart[0].dateTime;
    const email = _cart[0].email
    const orderCount = await Orders.countDocuments();
    const orderNumber = orderCount + 1;

    let priceTotal = 0;
    items.forEach(item => {
      priceTotal += item.product.price * item.quantity;
    });

    const order = new Orders({
      orderNumber: orderNumber,
      dateTime: dateTime,
      items: items,
      priceTotal: priceTotal,
      email: email
    });

    const newOrder = await order.save();
    return newOrder;
  }

  async getOrderById(id) {
    const order = await Orders.findOne({_id: id})
    return order
  }
}
