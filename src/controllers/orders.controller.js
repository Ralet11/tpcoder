import { OrdersRepository } from "../Modules/Orders/ordersRepository.js";
import { _transporter } from "../middleware/nodemailer.js";
import { cart, getItems, deleteCart } from "./cart.controller.js";

const OrderRep = new OrdersRepository();

export const createOrder = async (req, res, next) => {
  try {
    const _cart = await cart(req, res);
    const cartItems = await getItems(req, res);
    const order = await OrderRep.save({ cart: _cart, items: cartItems });

    const orderItems = order.items;
    let productsText = "";

    orderItems.forEach((item) => {
      const productName = item.product.name;
      const productQuantity = item.quantity;

      // Agregar el producto y cantidad a la cadena de texto
      productsText += `- ${productName}: ${productQuantity}\n`;
    });

    const mailOptions = {
      from: "actiongames_improved@hotmail.com",
      to: order.email,
      subject: "Gracias por tu compra!",
      text: `Hola!
      Desde Action Games Improved queremos agradecerte por confiar en nosotros y elegirnos!
      A continuación te dejamos los detalles de tu compra:

      Productos:
      ${productsText}
      Precio total: ${order.priceTotal}

      Esperamos que disfrutes tu compra.
      Saludos!
      `,
    };

    _transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });

    deleteCart(_cart[0].email);
    res.redirect(`/api/order/${order._id}`);
  } catch (error) {
    next(error); 
  }
};

export const renderOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await OrderRep.findOne(id);
    res.render("order.pug", { order: order });
  } catch (error) {
    next(error); 
  }
};