import { CartRepository } from "../Modules/Cart/cartRepository.js";

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



export const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartDao.findOne(id);
    res.json({ data: cart });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartDao.findItems();
    res.json({ data: cartItems });
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




