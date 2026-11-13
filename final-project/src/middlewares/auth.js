const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing JWT token in "Authorization: Bearer <token>"'
    });
  }

  try {
    const decoded = verifyToken(token);
    const user = User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, error: 'User does not exist or was deleted' });
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

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: Access requires one of [${roles.join(', ')}]. You have role '${req.user ? req.user.role : 'none'}'`
      });
    }
    next();
  };
};

module.exports = { requireAuth, requireRole };
