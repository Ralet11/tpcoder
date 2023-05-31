import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserDTO = {
  userna: '',
  phoneNum: 0,
  email: '',
  password: ''
};

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  phoneNum: {
    type: Number,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

const Users = mongoose.model("Users", userSchema);

export class UsersDaoMongo {
  async createUser(username, phoneNum, email, password) {
    const user = new Users({
      username,
      phoneNum,
      email,
      password
    });
    const newUser = await user.save();
    return newUser;
  }

  async logIn(username, password) {
    try {
    const userLogged = Users.findOne({username, password})
    return userLogged
  }
}
