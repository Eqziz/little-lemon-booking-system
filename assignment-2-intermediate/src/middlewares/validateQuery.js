const validateWeatherQuery = (req, res, next) => {
  const { city } = req.query;

  if (!city || city.trim().length === 0) {
    const error = new Error('Bad Request: Query parameter "city" is required. Example: ?city=Astana');
    error.status = 400;
    return next(error);
  }

  if (city.trim().length < 2) {
    const error = new Error('Bad Request: "city" must be at least 2 characters long.');
    error.status = 400;
    return next(error);
  }

  req.validatedCity = city.trim();
  next();
};

module.exports = {
  validateWeatherQuery
};
