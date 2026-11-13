# Assignment 2: Intermediate to Web Technologies (Back End)

**Course:** Web Technologies 2 (Back End) — Astana IT University  
**Student:** Nodir Mukhammedov  
**Year / Trimester:** 2nd year, 5th trimester  
**Attestation:** 1st Attestation (Weight: 30%)

---

## 📌 Project Overview
This project satisfies all requirements for **Assignment 2** as outlined in the university syllabus:
* **Server-Side Request & Response Processing**: Handling headers, query parameters, URL path variables, and status codes (RFC 7231).
* **Custom Middleware Pipeline**:
  1. `requestLogger`: Measures response execution time, logs IP, method, status code, and appends `X-Response-Time` header.
  2. `apiKeyAuth`: Header & query authentication guarding endpoints (`x-api-key`).
  3. `validateWeatherQuery`: Validates query parameters and blocks malformed input with 400 Bad Request.
  4. `errorHandler`: Centralized error handling providing standardized JSON errors with timestamps and HTTP status codes.
* **External REST API Integration**:
  * Live Weather API integration (**Open-Meteo**) with geocoding fallback.
  * Live Currency Exchange API integration (**ExchangeRate API**).
  * Payload transformation & caching logic.

---

## 📂 Project Structure
```text
assignment-2-intermediate/
├── src/
│   ├── middlewares/
│   │   ├── logger.js            # Request duration & access logger
│   │   ├── apiKeyAuth.js        # API Key authentication guard
│   │   ├── validateQuery.js     # Query string validator
│   │   └── errorHandler.js      # Global JSON error handler
│   ├── services/
│   │   └── externalApiService.js# External REST API client (Fetch & Transform)
│   ├── controllers/
│   │   └── apiController.js     # API route handlers
│   ├── routes/
│   │   └── apiRoutes.js         # Route declarations & middleware chaining
│   └── app.js                   # Application entry point
├── package.json
└── README.md
```

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
npm start
```
Server starts on port **3001** (`http://localhost:3001`).

---

## 🧪 Testing with cURL / Postman

### 1. Health Check (Public)
```bash
curl http://localhost:3001/api/health
```

### 2. Weather Endpoint (Without Key - 401 Unauthorized)
```bash
curl http://localhost:3001/api/weather?city=Astana
```

### 3. Weather Endpoint (With Valid Key & Validation)
```bash
curl -H "x-api-key: secret-key-aitu-2026" "http://localhost:3001/api/weather?city=Astana"
```

### 4. Currency Exchange Rates
```bash
curl -H "x-api-key: secret-key-aitu-2026" "http://localhost:3001/api/currencies?base=USD"
```

### 5. Validation Error (Missing City - 400 Bad Request)
```bash
curl -H "x-api-key: secret-key-aitu-2026" "http://localhost:3001/api/weather"
```
