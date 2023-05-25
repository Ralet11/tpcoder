import mongoose from "mongoose";

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
  
  export const Products = mongoose.model('Products', ProductsSchema);