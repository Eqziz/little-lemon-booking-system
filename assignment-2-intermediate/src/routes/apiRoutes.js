const express = require('express');
const router = express.Router();
const ApiController = require('../controllers/apiController');
const apiKeyAuth = require('../middlewares/apiKeyAuth');
const { validateWeatherQuery } = require('../middlewares/validateQuery');

// Public endpoint (health check)
router.get('/health', ApiController.getHealth);

// Protected endpoints (require API key authentication & parameter validation)
router.get('/weather', apiKeyAuth, validateWeatherQuery, ApiController.getWeather);
router.get('/currencies', apiKeyAuth, ApiController.getCurrencies);

module.exports = router;
