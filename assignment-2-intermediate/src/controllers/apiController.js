const ExternalApiService = require('../services/externalApiService');

const ApiController = {
  // Weather API Handler
  getWeather: async (req, res, next) => {
    try {
      const city = req.validatedCity;
      const weatherData = await ExternalApiService.getWeather(city);
      res.status(200).json({
        success: true,
        data: weatherData
      });
    } catch (err) {
      next(err);
    }
  },

  // Currency API Handler
  getCurrencies: async (req, res, next) => {
    try {
      const base = req.query.base || 'USD';
      const ratesData = await ExternalApiService.getCurrencyRates(base);
      res.status(200).json({
        success: true,
        data: ratesData
      });
    } catch (err) {
      next(err);
    }
  },

  // Service Status / Health Check
  getHealth: (req, res) => {
    res.status(200).json({
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      student: 'Nodir Mukhammedov',
      assignment: 'Assignment 2: Intermediate Backend'
    });
  }
};

module.exports = ApiController;
