import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import ordersRouter from "./routes/order.router.js";
import { Server } from "socket.io";
import http from "http";
import chatRouter from "./routes/chat.router.js";
import { SocketIO } from "./sockets.js";
import exphbs from "express-handlebars";
import dotenv from "dotenv";


const app = express();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//seteamos las vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const hbs = exphbs.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

//conexion a la base de datos
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB Atlas:', error);
  });

app.use(express.json());
app.use("/api/productos", productsRouter);
app.use("/api", cartRouter);
app.use("/api", userRouter);
app.use("/api", ordersRouter);
app.use("/api", chatRouter);

const httpServer = http.createServer(app);
const io = new Server(httpServer);

SocketIO(io);


httpServer.listen(process.env.PORT, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

// Middleware de error global
app.use((err, req, res, next) => {
  res.status(500).render('error.ejs', { errorMessage: err.message });
});