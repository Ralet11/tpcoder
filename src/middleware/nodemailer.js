//Middleware para nodemailer
import nodemailer from "nodemailer";

export const _transporter = nodemailer.createTransport({
  service: 'hotmail.com',
  auth: {
    user: 'actiongames_improved@hotmail.com',
    pass: 'actiongamesimproved11'
  }
});

