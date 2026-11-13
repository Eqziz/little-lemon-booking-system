const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Home page
router.get('/', UserController.getHome);

// Web Page (MVC Views)
router.get('/users', UserController.getAllUsers);
router.get('/users/new', UserController.getNewUserForm);
router.post('/users', UserController.createUser);

// JSON API endpoint
router.get('/api/users', UserController.getUsersJson);

module.exports = router;
