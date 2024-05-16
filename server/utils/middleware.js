import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function authenticateToken(req, res, next) {
  const accessToken = req?.cookies?.accessToken;

  if (!accessToken) return res.status(401).send({ message: 'Token Expired' });

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    req.user = data;
    next();
  });
}

export function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

export function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
