import { OrdersDaoMongo } from "./orders.dao.mongo.js";

export class OrdersRepository {
    constructor(ordersDao = new OrdersDaoMongo()){
        this.ordersDao = ordersDao
    };

    async save() {
        const order = await this.ordersDao.createOrder()
        return order
    }

    async findOne(id) {
        const order = await this.ordersDao.getOrderById(id)
        return order
    }


}