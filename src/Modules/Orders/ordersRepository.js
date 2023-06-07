import { OrdersDaoMongo } from "./orders.dao.mongo.js";

export class OrdersRepository {
    constructor(ordersDao = new OrdersDaoMongo()){
        this.ordersDao = ordersDao
    };

    async save({cart, items}) {
        const order = await this.ordersDao.createOrder(cart, items)
        return order
    }

    async findOne(id) {
        const order = await this.ordersDao.getOrderById(id)
        return order
    }


}