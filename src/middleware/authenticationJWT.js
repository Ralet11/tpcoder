import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [bearer, tokenValue] = token.split(" ");

  if (bearer !== "Bearer" || !tokenValue) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  jwt.verify(tokenValue, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}
