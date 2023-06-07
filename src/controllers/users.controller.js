import jwt from 'jsonwebtoken';
import { UsersRepository } from '../Modules/users/usersRepositories.js';

const usersRepository = new UsersRepository();

const register = async (req, res, next) => {
  const { username, phoneNum, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  try {
    await usersRepository.save(username, phoneNum, email, password);
    res.render("registerOk.pug");
  } catch (error) {
    next(error); 
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await usersRepository.logIn(username, password);
    const token = jwt.sign({ user }, process.env.API_KEY, { expiresIn: process.env.EXPIRE_IN });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/api/productos/');
  } catch (error) {
    next(error); 
  }
};

const getUser = async (req, res, next) => {
  const token = req.cookies.token;
  const _user = jwt.decode(token, process.env.API_KEY);
  const id = _user.user._id;

  try {
    const user = await usersRepository.getUser(id);
    res.json(user);
  } catch (error) {
    next(error); 
  }
};

const User = async (req, res, next) => {
  const token = req.cookies.token;
  const _user = jwt.decode(token, "secretKey");
  const id = _user.user._id;

  try {
    const user = await usersRepository.getUser(id);
    return user;
  } catch (error) {
    next(error); 
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('token'); 
    res.redirect('/api/');
  } catch (error) {
    next(error); 
  }
};

export { register, login, getUser, User, logout };
