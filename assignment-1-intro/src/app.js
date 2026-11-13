const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Built-in middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (HTML form)
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, '../public'))); // Serve static assets

// Request logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/', userRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('index', {
    title: '404 - Page Not Found',
    author: 'Nodir Mukhammedov',
    course: 'Web Technologies 2'
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`Assignment 1: Express MVC Server running on:`);
    console.log(`http://localhost:${PORT}`);
    console.log(`JSON API endpoint: http://localhost:${PORT}/api/users`);
    console.log(`===============================================`);
  });
}

module.exports = app;
