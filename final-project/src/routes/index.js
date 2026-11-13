const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');
const submissionController = require('../controllers/submissionController');

const { requireAuth, requireRole } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Auth Routes (Public)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', requireAuth, authController.getProfile);

// Course Routes (Public read, Instructor/Admin write)
router.get('/courses', courseController.getAll);
router.get('/courses/:id', courseController.getById);
router.post('/courses', requireAuth, requireRole('instructor', 'admin'), courseController.create);
router.put('/courses/:id', requireAuth, requireRole('instructor', 'admin'), courseController.update);
router.delete('/courses/:id', requireAuth, requireRole('admin'), courseController.delete);

// Submission Routes (Student upload & read own, Instructor grade)
router.get('/submissions', requireAuth, submissionController.getAll);
router.post('/submissions/upload', requireAuth, upload.single('file'), submissionController.uploadSubmission);
router.post('/submissions/:id/grade', requireAuth, requireRole('instructor', 'admin'), submissionController.gradeSubmission);

module.exports = router;
