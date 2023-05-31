import jwt from 'jsonwebtoken';
import { UsersRepository } from '../Modules/users/usersRepositories.js';
const usersRepository = new UsersRepository();

// Método para registrar un nuevo usuario
async function register(req, res) {
  const { username, phoneNum, email, password } = req.body;

  try {
    const newUser = await usersRepository.save(username, phoneNum, email, password);
    res.json({newUser, message: "usuario creado con exito"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Método para iniciar sesión y generar el token JWT
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Verificar las credenciales del usuario
    const user = await usersRepository.logIn(username, password);

    // Generar el token JWT
    const token = jwt.sign({ user }, 'secretKey', { expiresIn: '1h' });

    res.json({ token, message: "Usuario logueado" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

// Middleware para verificar el token JWT en las rutas protegidas


// Método para obtener los datos del usuario autenticado
function getUserData(req, res) {
  const userId = req.user.userId;

  // Obtener los datos del usuario a partir del userId
  // ...

  res.json({ userId, /* otros datos del usuario */ });
}

export { register, login, getUserData };
