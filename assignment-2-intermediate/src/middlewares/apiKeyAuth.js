const VALID_API_KEYS = new Set([
  'secret-key-aitu-2026',
  'developer-token-nodir',
  'demo-key'
]);

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey) {
    const error = new Error('Unauthorized: Missing API Key. Provide "x-api-key" header or "?api_key=" query param.');
    error.status = 401;
    return next(error);
  }

  if (!VALID_API_KEYS.has(apiKey)) {
    const error = new Error('Forbidden: Invalid API Key provided.');
    error.status = 403;
    return next(error);
  }

  req.authenticatedClient = apiKey;
  next();
};

module.exports = apiKeyAuth;
