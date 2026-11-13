const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Mock assignments database
let assignmentSubmissions = [
  { id: 1, studentId: 1, title: 'Assignment 1', fileUrl: '/uploads/sample.pdf', grade: 98, submittedAt: new Date() }
];

// Any authenticated user can view their assignments
router.get('/assignments', authenticateToken, (req, res) => {
  const data = req.user.role === 'admin' || req.user.role === 'instructor'
    ? assignmentSubmissions
    : assignmentSubmissions.filter(a => a.studentId === req.user.id);

  res.status(200).json({
    success: true,
    userRole: req.user.role,
    count: data.length,
    data: data
  });
});

// Secure file upload: students can upload assignment solutions
router.post('/assignments/upload', authenticateToken, upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded or file rejected by security filter.'
    });
  }

  const submission = {
    id: assignmentSubmissions.length + 1,
    studentId: req.user.id,
    studentName: req.user.name,
    title: req.body.title || 'Untitled Submission',
    fileName: req.file.filename,
    originalName: req.file.originalname,
    sizeBytes: req.file.size,
    path: `/uploads/${req.file.filename}`,
    submittedAt: new Date()
  };

  assignmentSubmissions.push(submission);

  res.status(201).json({
    success: true,
    message: 'File uploaded and validated successfully',
    data: submission
  });
});

// Admin / Instructor ONLY endpoint: grade assignment
router.post('/assignments/:id/grade', authenticateToken, authorizeRoles('instructor', 'admin'), (req, res) => {
  const { grade, feedback } = req.body;
  const item = assignmentSubmissions.find(a => a.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ success: false, error: 'Submission not found' });
  }

  item.grade = Number(grade);
  item.feedback = feedback;
  item.gradedBy = req.user.name;

  res.status(200).json({
    success: true,
    message: 'Grade recorded successfully',
    data: item
  });
});

module.exports = router;
