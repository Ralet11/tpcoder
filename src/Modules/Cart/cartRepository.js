import { CartRepo } from "./repository.js";
import { CartDAOMongo} from "./cart.dao.mongo.js";

export class CartRepository extends CartRepo {
    constructor(CartDao = new CartDAOMongo()) {
        super();
        this.CartDao = CartDao;
      }

      async find(email){
        const cart = await this.CartDao.getCart(email);
        return cart
      }

      async findItems(email) {
        const items = await this.CartDao.getCartItems(email);
        return items
      }

      async addProduct(productId, email, dateTime, deliveryAddress) {
        const cart = await this.CartDao.addProductToCart(productId, email, dateTime, deliveryAddress);
        return cart
      }

      async delete(email) {
        await this.CartDao.deleteCart(email);
        return true;
      }

      async deleteCartItem(id) {
        await this.CartDao.deleteCartItem(id);
        return true;
      }
      
      async updateCartItem(itemId, updatedItemData) {
        const updatedItem = await this.CartDao.updateCartItem(itemId, updatedItemData);
        return updatedItem;
      }
      
      


}