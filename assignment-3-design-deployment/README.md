# Assignment 3: Design and Deployment (Back End)

**Course:** Web Technologies 2 (Back End) — Astana IT University  
**Student:** Nodir Mukhammedov  
**Year / Trimester:** 2nd year, 5th trimester  
**Attestation:** 2nd Attestation (Weight: 30%)

---

## 📌 Project Overview
This project satisfies all requirements for **Assignment 3** as outlined in the university syllabus:
* **Database Modeling & CRUD (Weeks 5 & 6)**:
  * Entity relationship modeling & NoSQL data schemas using **Mongoose ODM**.
  * Strict schema validation (`enum`, `min`/`max`, type constraints, nested subdocuments).
  * Full RESTful CRUD operations (Create, Read, Update, Delete) with status codes (`201 Created`, `200 OK`, `400 Bad Request`, `404 Not Found`).
* **Deployment & Containerization (Week 7)**:
  * Production-ready `Dockerfile` (multi-stage build, minimal Alpine base).
  * `docker-compose.yml` orchestrating the Node.js application alongside a dedicated MongoDB instance.
  * Platform-as-a-Service configuration: `Procfile` for Heroku / Render.
  * Environment variable management (`.env.example`).

---

## 📂 Project Structure
```text
assignment-3-design-deployment/
├── src/
│   ├── config/
│   │   └── db.js                # Database connection manager with resilient fallback
│   ├── models/
│   │   └── itemModel.js         # Mongoose Schema & Data Layer
│   ├── controllers/
│   │   └── itemController.js    # CRUD controller handlers
│   ├── routes/
│   │   └── itemRoutes.js        # Express REST routes
│   └── app.js                   # Application entry point
├── Dockerfile                   # Container configuration
├── docker-compose.yml           # Multi-container orchestration (App + DB)
├── Procfile                     # Heroku/Render process declaration
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm start
```
Server runs on `http://localhost:3002`.

---

## 🐳 Running with Docker & Docker Compose
```bash
# Build and run containers (Application + MongoDB)
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

---

## 🧪 Testing REST Endpoints

### 1. Create Course (POST)
```bash
curl -X POST http://localhost:3002/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cloud Architecture & DevOps",
    "code": "SE308",
    "credits": 5,
    "department": "Software Engineering",
    "instructor": {
      "name": "Zhandos Seraliyev",
      "email": "zhandos.seraliyev@astanait.edu.kz"
    }
  }'
```

### 2. Get All Courses (GET)
```bash
curl http://localhost:3002/api/courses
```

### 3. Update Course (PUT)
```bash
curl -X PUT http://localhost:3002/api/courses/6640a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{"credits": 6}'
```

### 4. Delete Course (DELETE)
```bash
curl -X DELETE http://localhost:3002/api/courses/6640a1b2c3d4e5f6a7b8c9d0
```
