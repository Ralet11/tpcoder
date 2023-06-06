import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const UserDTO = {
  userna: '',
  phoneNum: null,
  email: '',
  password: ''
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Users = mongoose.model("Users", userSchema);

export class UsersDaoMongo {
  async createUser(username, phoneNum, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new Users({
      username,
      phoneNum,
      email,
      password: hashedPassword
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
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
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

  async getUser(id) {
    try {
      const user = await Users.findOne({_id: id});

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
    
