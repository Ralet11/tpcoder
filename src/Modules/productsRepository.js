import { Repository } from "./repository.js";
import { ProductDAOMongo } from "../Modules/products.dao.mongo.js";

export class ProductRepository extends Repository {
  constructor(ProductDao = new ProductDAOMongo()) {
    super();
    this.ProductDao = ProductDao;
  }

  async find() {
    const products = await this.ProductDao.getAllProducts();
    return products;
  }

  async findOne(id) {
    const product = await this.ProductDao.getProductById(id);
    return product;
  }

  async save(product) {
    const _product = await this.ProductDao.createProduct(product);
    return _product;
  }

  async delete(id) {
    await this.ProductDao.deleteProduct(id);
    return true;
  }

  async update(id, product) {
    const _product = await this.ProductDao.UpdateProduct(id, product);
    return _product;
  }
}