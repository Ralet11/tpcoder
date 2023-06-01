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

  async userLogin(username, password) {
    try {
      const user = await Users.findOne({ username });
  
      if (!user) {
        throw new Error('Invalid username or password');
      }
  
      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      if (user.password !== password) {
        throw new Error('Invalid username or password');
      }
  
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  

  async deleteUser(username) {
    try {
      const deletedUser = await Users.findOneAndDelete({ username });

      if (!deletedUser) {
        throw new Error('User not found');
      }

      return deletedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
