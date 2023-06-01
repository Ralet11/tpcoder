import { CartRepo } from "./repository.js";
import { CartDAOMongo} from "./cart.dao.mongo.js";

export class CartRepository extends CartRepo {
    constructor(CartDao = new CartDAOMongo()) {
        super();
        this.CartDao = CartDao;
      }

      async find(){
        const cart = await this.CartDao.getCart();
        return cart
      }

      async findItems() {
        const items = await this.CartDao.getCartItems();
        return items
      }

      async addProduct(productId, email, dateTime, deliveryAddress) {
        const cart = await this.CartDao.addProductToCart(productId, email, dateTime, deliveryAddress);
        return cart
      }

      async delete() {
        await this.CartDao.deleteCart();
        return true;
      }

      // Repositorio
      async deleteCartItem(id) {
        await this.CartDao.deleteCartItem(id);
        return true;
      }
      

      // Repositorio
      async updateCartItem(itemId, updatedItemData) {
        const updatedItem = await this.CartDao.updateCartItem(itemId, updatedItemData);
        return updatedItem;
      }
      
      


}