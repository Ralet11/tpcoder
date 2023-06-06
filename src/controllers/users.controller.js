import jwt from 'jsonwebtoken';
import { UsersRepository } from '../Modules/users/usersRepositories.js';
const usersRepository = new UsersRepository();

// Método para registrar un nuevo usuario
async function register(req, res) {
  console.log("papa")
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
    // Verificar las credenciales del usuario
    const user = await usersRepository.logIn(username, password);
  
    // Generar el token JWT
    const token = jwt.sign({ user }, 'secretKey', { expiresIn: '1h' });

    // Configurar la cookie con el token
    res.cookie('token', token, { httpOnly: true });

    // Redirigir al usuario a la ruta deseada
    res.redirect('/api/products/');
  } catch (error) {
    res.status(401).json({ message: error.message });
  }

}



// Middleware para verificar el token JWT en las rutas protegidas


// Método para obtener los datos del usuario autenticado
async function getUser(req, res) {
const token = req.cookies.token
 const _user = jwt.decode(token, "secretKey")
 const id = _user.user._id
  try {
    const user = await usersRepository.getUser(id);
    console.log(user)
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
    return user; // Retornar el objeto de usuario en lugar de enviar una respuesta JSON
  } catch (error) {
    throw new Error(error.message);
  }
}



export { register, login, getUser, User };
