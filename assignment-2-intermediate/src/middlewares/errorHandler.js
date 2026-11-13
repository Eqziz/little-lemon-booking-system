const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const isDevelopment = process.env.NODE_ENV !== 'production';

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: {
      message: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      ...(isDevelopment && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;
