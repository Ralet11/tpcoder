import { CartRepository } from "../Modules/Cart/cartRepository.js";
import { User } from "./users.controller.js";

const CartDao = new CartRepository();

export const getCart = async (req, res, next) => {
  try {
    const user = await User(req, res)
    const cart = await CartDao.find(user.email);
    const cartExists = cart !== null && cart.length > 0; 
    console.log(cartExists)
    res.json(cartExists);
  } catch (error) {
    next(error);
  }
};

export const cart = async (req, res, next) => {
  try {
    const user = await User(req, res);
    const cart = await CartDao.find(user.email);
    return cart;
  } catch (error) {
    next(error);
  }
};

export const getCartById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cart = await CartDao.findOne(id);
    res.json({ data: cart });
  } catch (error) {
    next(error);
  }
};

export const renderCart = async (req, res, next) => {
  try {
    function getToTalPrice(cartItems) {
      let priceTotal = 0;
      cartItems.forEach(item => {
        priceTotal += item.product.price * item.quantity;
      });
      return priceTotal;
    }

    function getTotalProducts(cartItems) {
      let total = 0;
      cartItems.forEach(function(item) {
        total += item.quantity;
      });
      return total;
    }

    const user = await User(req, res);
    const _cart = await cart(req, res);
    const items = await getItems(req, res);

    if (_cart && _cart.length > 0 && items && items.length > 0) {
      const cartItems = await CartDao.findItems(user.email);
      const totalProducts = getTotalProducts(cartItems);
      const totalPrice = getToTalPrice(cartItems);
      res.render("cart.pug", {
        cartItems,
        _cart,
        user,
        totalProducts,
        totalPrice
      });
    } else {
      res.render("notcart.pug"); // Renderizar la vista cuando no hay un carrito o no hay items en el carrito
    }
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  const { productId, email, dateTime, deliveryAddress } = req.body;

  try {
    const cart = await CartDao.addProduct(productId, email, dateTime, deliveryAddress);

    res.json({ data: cart, message: 'Product added to cart successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (email, next) => {
  try {
    const result = await CartDao.delete(email);
    if (result) {
      return { message: "Cart deleted successfully" };
    } else {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCartItem = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  try {
    await CartDao.deleteCartItem(id);
    res.json({ message: "CartItem deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  const { id } = req.params;
  const updatedItemData = req.body;

  try {
    const updatedItem = await CartDao.updateCartItem(id, updatedItemData);
    res.json({ data: updatedItem, message: "CartItem updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const getItems = async (req, res, next) => {
  try {
    const user = await User(req, res);
    const cartItems = await CartDao.findItems(user.email);

    if (!cartItems || cartItems.length === 0) {
      // Si el carrito está vacío, retornar un array vacío
      return [];
    }

    return cartItems;
  } catch (error) {
    next(error);
  }
};







