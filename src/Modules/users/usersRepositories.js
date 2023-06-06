import { UsersDaoMongo } from "./users.dao.mongo.js";



export class UsersRepository {
    constructor(UserDao = new UsersDaoMongo()) {
        this.UserDao = UserDao;
      }
    async save(username, phoneNum, email, password) {
        const newUser = this.UserDao.createUser(username, phoneNum, email, password)
        return newUser
    }

    async logIn(username, password) {
        const userLogged = this.UserDao.userLogin(username, password)
        return userLogged
    }

    async delete(username) {
        const userDelete = this.UserDao.deleteUser(username)
        return userDelete
    }

    async getUser(id) {
        const user = this.UserDao.getUser(id)
        return user
    }
}