const Submission = require('../models/Submission');

const submissionController = {
  // Students and instructors get list of submissions
  getAll: (req, res) => {
    const filter = {};
    if (req.user.role === 'student') {
      filter.studentId = req.user.id;
    }
    if (req.query.courseId) {
      filter.courseId = req.query.courseId;
    }

    const list = Submission.findAll(filter);
    res.status(200).json({ success: true, count: list.length, data: list });
  },

  // Student uploads assignment file
  uploadSubmission: (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file provided or file type not allowed' });
    }

    const item = Submission.create({
      studentId: req.user.id,
      studentName: req.user.name,
      courseId: req.body.courseId || 1,
      title: req.body.title || req.file.originalname,
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      sizeBytes: req.file.size
    });

    res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully',
      data: item
    });
  },

  // Instructor or Admin grades submission
  gradeSubmission: (req, res) => {
    const { grade, feedback } = req.body;
    if (grade === undefined) {
      return res.status(400).json({ success: false, error: 'Field "grade" is required (0-100)' });
    }

    const updated = Submission.gradeSubmission(req.params.id, {
      grade,
      feedback,
      instructorName: req.user.name
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Grade recorded successfully',
      data: updated
    });
  }
};

module.exports = submissionController;
