import { OrdersRepository } from "../Modules/Orders/ordersRepository.js";
import { _transporter } from "../middleware/nodemailer.js";

const OrderRep = new OrdersRepository();

export const createOrder = async (req, res) => {
    const order = await OrderRep.save();
    console.log(order._id);
    
    const orderItems = order.items;
    let productsText = '';
  
    orderItems.forEach((item) => {
      const productName = item.product.name; // Acceder al nombre del producto
      const productQuantity = item.quantity;
  
      // Agregar el producto y cantidad a la cadena de texto
      productsText += `- ${productName}: ${productQuantity}\n`;
    });
  
    const mailOptions = {
      from: 'action_games_improved@hotmail.com', // Tu dirección de correo electrónico
      to: order.email, // Dirección de correo electrónico del destinatario
      subject: 'Gracias por tu compra!',
      text: `Hola!
      Desde Action Games Improved queremos agradecerte por confiar en nosotros y elegirnos!
      A continuación te dejamos los detalles de tu compra:
  
      Productos:
      ${productsText}
      Precio total: ${order.priceTotal}

        Esperamos que disfrutes tu compra.
        Saludos!
      `
    };
  
    
    _transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });
    
    res.redirect(`/api/order/${order._id}`); // Redirecciona a la ruta con el ID de la orden
  };
  

export const renderOrder = async (req, res) => {
  const id = req.params.id; // Obtiene el ID de la orden de los parámetros de la URL
  const order = await OrderRep.findOne(id); // Obtiene la orden utilizando el ID
  res.render('order', { order: order });
};


