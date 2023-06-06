import jwt from 'jsonwebtoken';
import { UsersRepository } from '../Modules/users/usersRepositories.js';
const usersRepository = new UsersRepository();


  async function register(req, res) {
  
  const { username, phoneNum, email, password, confirmPassword } = req.body;
  console.log(password,confirmPassword)

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  try {
    const newUser = await usersRepository.save(username, phoneNum, email, password);
    res.render("registerOk")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Método para iniciar sesión y generar el token JWT
async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await usersRepository.logIn(username, password);
    const token = jwt.sign({ user }, 'secretKey', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/api/products/');
    } catch (error) {
    res.status(401).json({ message: error.message });
    }

  }


  async function getUser(req, res) {
  const token = req.cookies.token
  const _user = jwt.decode(token, "secretKey")
  const id = _user.user._id
    try {
      const user = await usersRepository.getUser(id);
      res.json(user);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async function User(req, res) {
    const token = req.cookies.token;
    const _user = jwt.decode(token, "secretKey");
    const id = _user.user._id;
    try {
      const user = await usersRepository.getUser(id);
      return user; 
    } catch (error) {
      throw new Error(error.message);
    }
  }



export { register, login, getUser, User };
