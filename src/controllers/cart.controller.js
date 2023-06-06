import { resolve } from "path";
import { CartRepository } from "../Modules/Cart/cartRepository.js";
import { User } from "./users.controller.js";

const CartDao = new CartRepository();

export const getCart = async (req, res) => {
  try {
    const cart = await CartDao.find();
    const cartExists = cart !== null && cart.length > 0; // Verificar si el carrito existe y tiene elementos
    console.log(cartExists)
    res.json(cartExists);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: error.message });
  }
}

export const cart = async () => {
  try {
    const cart = await CartDao.find();
    return cart; // Retornar el carrito en lugar de enviar una respuesta JSON
  } catch (error) {
    throw new Error("Internal server error");
  }
};




export const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartDao.findOne(id);
    res.json({ data: cart });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const renderCart = async (req, res) => {
  try {

    function getToTalPrice(cartItems){
      let priceTotal = 0;
      cartItems.forEach(item => {
      priceTotal += item.product.price * item.quantity;
    });
      return priceTotal
    }
    function getTotalProducts(cartItems) {
      let total = 0;
      cartItems.forEach(function(item) {
        total += item.quantity;
      });
      return total;
    }

    const _cart = await cart(req, res); // Obtener el carrito
    const user = await User(req, res); // Obtener el usuario

    if (_cart && _cart.length > 0) {
      const cartItems = await CartDao.findItems(); // Obtener los items del carrito
      const totalProducts = getTotalProducts(cartItems)
      const totalPrice = getToTalPrice(cartItems)
      res.render("cart", {
        cartItems,
        _cart,
        user,
        totalProducts,
        totalPrice
      });
    } else {
      res.render("notcart"); // Renderizar la vista cuando no hay un carrito
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};





export const addProductToCart = async (req, res) => {
  const { productId, email, dateTime, deliveryAddress } = req.body;

  try {
    const cart = await CartDao.addProduct(productId, email, dateTime, deliveryAddress);

    res.json({ data: cart, message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



export const deleteCart = async (req, res) => {
  

  try {
    const result = await CartDao.delete();
    if (result) {
      res.json({ message: "Cart deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Controlador
export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    await CartDao.deleteCartItem(id);
    res.json({ message: "CartItem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


  
// Controlador
export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const updatedItemData = req.body;

  try {
    const updatedItem = await CartDao.updateCartItem(id, updatedItemData);
    res.json({ data: updatedItem, message: "CartItem updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getItems = async (req,res) => {
  const cartItems = await CartDao.findItems()
  return cartItems
}




