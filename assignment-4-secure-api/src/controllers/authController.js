const UserModel = require('../models/userModel');
const { generateToken } = require('../config/jwt');

const AuthController = {
  // POST /api/auth/register
  register: async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Fields "name", "email", and "password" are required'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Password must be at least 6 characters long'
        });
      }

      const user = await UserModel.create({ name, email, password, role });
      const token = generateToken({ id: user.id, email: user.email, role: user.role });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user,
          token
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/auth/login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }

      const user = UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }

      const isMatch = await UserModel.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }

      const token = generateToken({ id: user.id, email: user.email, role: user.role });
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        message: 'Authentication successful',
        data: {
          user: userWithoutPassword,
          token
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/auth/profile (Protected)
  getProfile: (req, res) => {
    res.status(200).json({
      success: true,
      data: req.user
    });
  }
};

module.exports = AuthController;
