const Course = require('../models/Course');

const courseController = {
  getAll: (req, res) => {
    const { department, search } = req.query;
    const courses = Course.findAll({ department, search });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  },

  getById: (req, res) => {
    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  },

  create: (req, res) => {
    const { title, code, credits, department, description } = req.body;
    if (!title || !code) {
      return res.status(400).json({ success: false, error: 'Title and code are required' });
    }
    const course = Course.create({
      title,
      code,
      credits,
      department,
      description,
      instructorId: req.user.id
    });
    res.status(201).json({ success: true, message: 'Course created successfully', data: course });
  },

  update: (req, res) => {
    const updated = Course.updateById(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course updated', data: updated });
  },

  delete: (req, res) => {
    const deleted = Course.deleteById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted', data: deleted });
  }
};

module.exports = courseController;
