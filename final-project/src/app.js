require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors());

// Rate Limiter: 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Body Parsers
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Static file hosting for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect Database
connectDB();

// API Routes
app.use('/api', apiRoutes);

// Root Manifest
app.get('/', (req, res) => {
  res.status(200).json({
    project: 'EduPortal REST API Backend',
    course: 'Web Technologies 2 (Back End) - Astana IT University',
    student: 'Nodir Mukhammedov',
    version: '1.0.0',
    status: 'Production Ready',
    documentation: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login', 'GET /api/auth/profile'],
      courses: ['GET /api/courses', 'GET /api/courses/:id', 'POST /api/courses', 'PUT /api/courses/:id', 'DELETE /api/courses/:id'],
      submissions: ['GET /api/submissions', 'POST /api/submissions/upload', 'POST /api/submissions/:id/grade']
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`EduPortal Backend running on: http://localhost:${PORT}`);
    console.log(`Swagger/API Docs: http://localhost:${PORT}/`);
    console.log(`===============================================`);
  });
}

module.exports = app;
