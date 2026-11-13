const UserModel = require('../models/userModel');

const UserController = {
  // Render Home Page
  getHome: (req, res) => {
    res.render('index', {
      title: 'Web Technologies 2 - Assignment 1',
      author: 'Nodir Mukhammedov',
      course: 'Web Technologies 2 (Back End)'
    });
  },

  // Get all users (View list)
  getAllUsers: (req, res) => {
    const users = UserModel.findAll();
    res.render('users', {
      title: 'Users Directory (MVC Demo)',
      users: users
    });
  },

  // Render form to add user
  getNewUserForm: (req, res) => {
    res.render('newUser', {
      title: 'Add New User',
      error: null
    });
  },

  // Handle POST submission to add user
  createUser: (req, res) => {
    const { name, role, email } = req.body;

    if (!name || !role || !email) {
      return res.status(400).render('newUser', {
        title: 'Add New User',
        error: 'All fields (Name, Role, Email) are required.'
      });
    }

    UserModel.create({ name, role, email });
    res.redirect('/users');
  },

  // API JSON endpoint demonstrating dual rendering / API capability
  getUsersJson: (req, res) => {
    const users = UserModel.findAll();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  }
};

module.exports = UserController;
