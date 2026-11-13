const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'aitu-web2-super-secret-jwt-key-2026';
const JWT_EXPIRES_IN = '24h';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  JWT_SECRET,
  generateToken,
  verifyToken
};
