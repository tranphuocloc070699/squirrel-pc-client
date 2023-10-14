const jwt = require('jsonwebtoken');

export const generateToken = () => {
    const payload = { test: 'st' };
    const secretKey = import.meta.env.VITE_JWT_SECRET;
  return jwt.sign(payload, secretKey, { expiresIn: '5s' });
}
