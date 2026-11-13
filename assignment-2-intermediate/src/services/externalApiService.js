/**
 * External API Service: demonstrates integrating third-party RESTful APIs
 * using native Node.js fetch, data transformation, and robust error handling.
 */

// Coordinates mapping for major cities
const CITY_COORDINATES = {
  'astana': { lat: 51.1694, lon: 71.4491, country: 'Kazakhstan' },
  'almaty': { lat: 43.2220, lon: 76.8512, country: 'Kazakhstan' },
  'shymkent': { lat: 42.3417, lon: 69.5901, country: 'Kazakhstan' },
  'london': { lat: 51.5074, lon: -0.1278, country: 'United Kingdom' },
  'new york': { lat: 40.7128, lon: -74.0060, country: 'United States' },
  'tokyo': { lat: 35.6762, lon: 139.6503, country: 'Japan' },
  'paris': { lat: 48.8566, lon: 2.3522, country: 'France' }
};

const ExternalApiService = {
  /**
   * Fetch real-time weather from Open-Meteo API
   */
  getWeather: async (cityName) => {
    const key = cityName.toLowerCase().trim();
    let coords = CITY_COORDINATES[key];

    // If city not in static cache, lookup via Open-Meteo Geocoding API
    if (!coords) {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) {
        throw new Error(`Geocoding service unavailable (status: ${geoRes.status})`);
      }
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        const notFound = new Error(`City "${cityName}" not found.`);
        notFound.status = 404;
        throw notFound;
      }
      coords = {
        lat: geoData.results[0].latitude,
        lon: geoData.results[0].longitude,
        country: geoData.results[0].country
      };
    }

    // Query weather data
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m&timezone=auto`;
    const res = await fetch(weatherUrl);
    if (!res.ok) {
      throw new Error(`Weather provider returned HTTP ${res.status}`);
    }

    const raw = await res.json();

    // Transform raw JSON payload into clean structured response
    return {
      location: {
        city: cityName,
        country: coords.country,
        latitude: coords.lat,
        longitude: coords.lon,
        timezone: raw.timezone
      },
      current: {
        temperatureC: raw.current.temperature_2m,
        temperatureF: Math.round((raw.current.temperature_2m * 9/5 + 32) * 10) / 10,
        humidity: `${raw.current.relative_humidity_2m}%`,
        windSpeedKmh: raw.current.wind_speed_10m,
        time: raw.current.time
      },
      retrievedAt: new Date().toISOString()
    };
  },

  /**
   * Fetch live currency exchange rates
   */
  getCurrencyRates: async (base = 'USD') => {
    const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(base.toUpperCase())}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Currency API returned status ${res.status}`);
    }
    const data = await res.json();
    if (data.result === 'error') {
      const err = new Error(data['error-type'] || 'Currency conversion error');
      err.status = 400;
      throw err;
    }

    return {
      baseCurrency: data.base_code,
      lastUpdated: data.time_last_update_utc,
      rates: {
        KZT: data.rates.KZT,
        EUR: data.rates.EUR,
        USD: data.rates.USD,
        GBP: data.rates.GBP,
        CNY: data.rates.CNY,
        RUB: data.rates.RUB
      }
    };
  }
};

module.exports = ExternalApiService;
