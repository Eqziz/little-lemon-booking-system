require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = process.env.PORT || 3003;

// 1. Security Headers (OWASP)
app.use(helmet());

// 2. Rate Limiting (Brute-force protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
app.use('/api/', limiter);

// 3. Body Parsing with payload limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 5. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

// Welcome & API Manifest
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Assignment 4: Secure and Interactive Exploration (JWT, RBAC & File Uploads)',
    course: 'Web Technologies 2 (Back End) - AITU',
    student: 'Nodir Mukhammedov',
    securityFeatures: [
      'OWASP Helmet HTTP Headers',
      'Rate Limiting & DoS Protection',
      'Bcrypt Password Salting (10 rounds)',
      'Stateless JWT Authentication',
      'Role-Based Access Control (Student, Instructor, Admin)',
      'Multer Secure File Upload with Mime & Extension verification'
    ],
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/profile (Bearer token)',
      assignments: 'GET /api/assignments (Bearer token)',
      upload: 'POST /api/assignments/upload (multipart/form-data, Bearer token)',
      grade: 'POST /api/assignments/:id/grade (Instructor/Admin only)'
    }
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[Error Handler]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`Assignment 4: Secure API running on http://localhost:${PORT}`);
    console.log(`===============================================`);
  });
}

module.exports = app;
