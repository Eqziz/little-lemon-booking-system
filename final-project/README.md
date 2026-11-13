# Final Project: EduPortal REST API

**Course:** Web Technologies 2 (Back End) — Astana IT University  
**Student:** Nodir Mukhammedov  
**Year / Trimester:** 2nd year, 5th trimester  
**Examination:** Final Project Defense (100% Final Exam, 40% of Total Grade)

---

## 📌 Executive Summary
**EduPortal** is a production-grade academic management backend service engineered with **Node.js**, **Express.js**, **MongoDB / Mongoose**, and **JWT Authentication**.

It represents the culmination of all 10 weeks of the syllabus:
* Layered MVC / Clean Architecture.
* RESTful Resource Design (RFC 7231).
* Role-Based Access Control (RBAC: `student`, `instructor`, `admin`).
* High-security defenses against OWASP Top 10 vulnerabilities.
* Multi-part secure file uploads for assignment submission and grading.

---

## 📂 Architecture
```text
final-project/
├── src/
│   ├── config/
│   │   ├── db.js                # Database connection & failover
│   │   └── jwt.js               # JWT signing & secret configuration
│   ├── models/
│   │   ├── User.js              # User entity with bcrypt salting & hashing
│   │   ├── Course.js            # Course catalog model
│   │   └── Submission.js        # File submissions and grades
│   ├── middlewares/
│   │   ├── auth.js              # JWT & RBAC permission checks
│   │   └── upload.js            # Multer secure upload configuration
│   ├── controllers/
│   │   ├── authController.js    # Register, Login, Current User
│   │   ├── courseController.js  # Course CRUD
│   │   └── submissionController.js # Submissions & Grading
│   ├── routes/
│   │   └── index.js             # Route declarations
│   └── app.js                   # Application entry point with Helmet & Rate-Limiter
├── uploads/                     # Sanitized uploaded files
├── DEFENSE_GUIDE.md             # Oral defense answers & rubric reference
├── package.json
└── README.md
```

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
Server runs on port **5000** (`http://localhost:5000`).

---

## 🧪 Testing the Complete Workflow

### Step 1: Register an Instructor
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Altynbek Seitenov",
    "email": "altynbek@astanait.edu.kz",
    "password": "InstructorPass2026!",
    "role": "instructor"
  }'
```

### Step 2: Register a Student
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nodir Mukhammedov",
    "email": "nodir@astanait.edu.kz",
    "password": "StudentPass2026!",
    "role": "student"
  }'
```

### Step 3: Login to Obtain JWT Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nodir@astanait.edu.kz",
    "password": "StudentPass2026!"
  }'
```

### Step 4: Create a Course (Instructor Only)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <INSTRUCTOR_JWT>" \
  -d '{
    "title": "Web Technologies 2 (Back End)",
    "code": "SE305",
    "credits": 5,
    "department": "Software Engineering"
  }'
```

### Step 5: Upload an Assignment Solution (Student)
```bash
curl -X POST http://localhost:5000/api/submissions/upload \
  -H "Authorization: Bearer <STUDENT_JWT>" \
  -F "title=Assignment 4 Solution" \
  -F "courseId=1" \
  -F "file=@./package.json"
```

### Step 6: Grade the Submission (Instructor Only)
```bash
curl -X POST http://localhost:5000/api/submissions/1/grade \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <INSTRUCTOR_JWT>" \
  -d '{
    "grade": 100,
    "feedback": "Excellent work! Full rubric criteria satisfied."
  }'
```
