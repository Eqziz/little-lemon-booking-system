const { ItemService } = require('../models/itemModel');

const ItemController = {
  // CREATE (POST /api/courses)
  createCourse: async (req, res, next) => {
    try {
      const { title, code, credits, department, isElective, instructor } = req.body;

      if (!title || !code || !credits) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error: "title", "code", and "credits" are required fields.'
        });
      }

      const course = await ItemService.create({
        title,
        code,
        credits: Number(credits),
        department,
        isElective: Boolean(isElective),
        instructor: instructor || { name: 'Faculty Staff', email: 'faculty@astanait.edu.kz' }
      });

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: course
      });
    } catch (err) {
      next(err);
    }
  },

  // READ ALL (GET /api/courses)
  getAllCourses: async (req, res, next) => {
    try {
      const courses = await ItemService.find();
      res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
      });
    } catch (err) {
      next(err);
    }
  },

  // READ ONE (GET /api/courses/:id)
  getCourseById: async (req, res, next) => {
    try {
      const course = await ItemService.findById(req.params.id);
      if (!course) {
        return res.status(404).json({
          success: false,
          error: `Course not found with id: ${req.params.id}`
        });
      }
      res.status(200).json({
        success: true,
        data: course
      });
    } catch (err) {
      next(err);
    }
  },

  // UPDATE (PUT /api/courses/:id)
  updateCourse: async (req, res, next) => {
    try {
      const updated = await ItemService.findByIdAndUpdate(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({
          success: false,
          error: `Course not found with id: ${req.params.id}`
        });
      }
      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  // DELETE (DELETE /api/courses/:id)
  deleteCourse: async (req, res, next) => {
    try {
      const deleted = await ItemService.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: `Course not found with id: ${req.params.id}`
        });
      }
      res.status(200).json({
        success: true,
        message: 'Course deleted successfully',
        data: deleted
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = ItemController;
