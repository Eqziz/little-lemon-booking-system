const { verifyToken } = require('../config/jwt');
const UserModel = require('../models/userModel');

// Authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access denied: No token provided in "Authorization: Bearer <token>" header'
    });
  }

  try {
    const decoded = verifyToken(token);
    const user = UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token: User no longer exists'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Invalid or expired JWT token',
      details: err.message
    });
  }
};

// Authorize roles (Role-Based Access Control)
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: Requires one of the following roles: [${allowedRoles.join(', ')}]. Your role: ${req.user ? req.user.role : 'none'}`
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles
};
