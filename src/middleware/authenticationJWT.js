import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.redirect("/api/");
    }

    req.user = user;
    next();
  });
}
