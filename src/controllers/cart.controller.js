import { CartDAOMongo } from "../Modules/Cart/cart.dao.mongo.js";

const CartDao = new CartDAOMongo();

export const createCart = async (req, res) => {
  const { email, dateTime, items, deliveryAddress } = req.body;

  if (!email || !dateTime || !items || !deliveryAddress) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const newCart = await CartDao.createCart(email, dateTime, items, deliveryAddress);
    res.status(201).json({ data: newCart, message: "Cart has been created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartDao.getCartById(id);
    res.json({ data: cart });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cartItems = await CartDao.getCartItems(cartId);
    res.json({ data: cartItems });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  const { cartId, productId } = req.body;

  if (!cartId || !productId) {
    return res.status(400).json({ message: "Bad request", data: null });
  }

  try {
    const cart = await CartDao.addProductToCart(cartId, productId);
    res.json({ data: cart, message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }

};

export const deleteCart = async (req, res) => {
    const { cartId } = req.params;
    
    try {
      const result = await CartDAOMongo.deleteCart(cartId);
      if (result) {
        res.json({ message: "Cart deleted successfully" });
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
  export const updateCart = async (req, res) => {
    const { cartId } = req.params;
    const updatedCartData = req.body;
    
    try {
      const updatedCart = await CartDAOMongo.updateCart(cartId, updatedCartData);
      res.json({ data: updatedCart, message: "Cart updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };