const express = require('express');
const requestLogger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Request Logger Middleware
app.use(requestLogger);

// Mount API routes
app.use('/api', apiRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Assignment 2: Intermediate Backend API',
    course: 'Web Technologies 2 (Back End) - AITU',
    student: 'Nodir Mukhammedov',
    endpoints: {
      health: 'GET /api/health',
      weather: 'GET /api/weather?city=Astana (requires x-api-key header)',
      currencies: 'GET /api/currencies?base=USD (requires x-api-key header)'
    },
    demoApiKey: 'secret-key-aitu-2026'
  });
});

// 404 Route Handler
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`Assignment 2: Intermediate Backend API running on:`);
    console.log(`http://localhost:${PORT}`);
    console.log(`Demo Key: secret-key-aitu-2026`);
    console.log(`===============================================`);
  });
}

module.exports = app;
