const User = require('../models/User');
const { generateToken } = require('../config/jwt');

const authController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
      }
      if (password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
      }
      const user = await User.create({ name, email, password, role });
      const token = generateToken({ id: user.id, email: user.email, role: user.role });
      res.status(201).json({
        success: true,
        message: 'Account registered successfully',
        data: { user, token }
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required' });
      }
      const user = User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
      const token = generateToken({ id: user.id, email: user.email, role: user.role });
      const { password: _, ...cleanUser } = user;
      res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: { user: cleanUser, token }
      });
    } catch (err) {
      next(err);
    }
  },

  getProfile: (req, res) => {
    res.status(200).json({ success: true, data: req.user });
  }
};

module.exports = authController;
