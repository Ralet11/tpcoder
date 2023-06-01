import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routes/cart.router.js"
import productsRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static("public"));



// URL de conexión a MongoDB
const url = 'mongodb://127.0.0.1:27017/products';

// Conectar a MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');

  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

app.use(express.json())
app.use("/api/products", productsRouter);
app.use("/api", cartRouter);
app.use("/api", userRouter)



app.listen(3000, ()=> {
    console.log("servidor escuchando en puerto 3000")
})

