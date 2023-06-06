import nodemailer from "nodemailer";

export const _transporter = nodemailer.createTransport({
  service: 'hotmail.com',
  auth: {
    user: 'action_games_improved@hotmail.com',
    pass: 'contrasenia123456'
  }
});

