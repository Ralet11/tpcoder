import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routes/cart.router.js"
import productsRouter from "./routes/product.router.js";


const app = express();



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



app.listen(3000, ()=> {
    console.log("servidor escuchando en puerto 3000")
})