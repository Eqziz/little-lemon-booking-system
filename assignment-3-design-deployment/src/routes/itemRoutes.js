const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

// Full CRUD routes
router.route('/')
  .get(ItemController.getAllCourses)
  .post(ItemController.createCourse);

router.route('/:id')
  .get(ItemController.getCourseById)
  .put(ItemController.updateCourse)
  .delete(ItemController.deleteCourse);

module.exports = router;
