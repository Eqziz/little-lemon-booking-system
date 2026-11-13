require('dotenv').config();
const express = require('express');
const { connectDB, getDBStatus } = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// API Routes
app.use('/api/courses', itemRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Assignment 3: Design & Deployment (Database CRUD & Docker)',
    course: 'Web Technologies 2 (Back End) - AITU',
    student: 'Nodir Mukhammedov',
    database: {
      type: 'MongoDB / Mongoose ODM',
      connected: getDBStatus()
    },
    endpoints: {
      getAll: 'GET /api/courses',
      getById: 'GET /api/courses/:id',
      create: 'POST /api/courses',
      update: 'PUT /api/courses/:id',
      delete: 'DELETE /api/courses/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Error]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`Assignment 3 Server running on: http://localhost:${PORT}`);
    console.log(`MongoDB URI: ${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aitu_web2'}`);
    console.log(`===============================================`);
  });
}

module.exports = app;
