# Assignment 4: Secure and Interactive Exploration (Back End)

**Course:** Web Technologies 2 (Back End) — Astana IT University  
**Student:** Nodir Mukhammedov  
**Year / Trimester:** 2nd year, 5th trimester  
**Attestation:** 2nd Attestation (Weight: 30%)

---

## 📌 Project Overview
This project satisfies all requirements for **Assignment 4** as outlined in the university syllabus:
* **Authentication and Security (Weeks 8 & 9)**:
  * Password hashing and salting using **bcryptjs** (10 salt rounds).
  * Stateless token authentication via **JSON Web Tokens (JWT)**.
  * Role-Based Access Control (**RBAC**): `student`, `instructor`, and `admin` permissions.
* **Security & OWASP Defense (Week 10)**:
  * **Helmet.js**: Sets security headers (CSP, X-Content-Type-Options, Strict-Transport-Security, X-Frame-Options).
  * **Rate Limiting**: Protects authentication and API endpoints against brute force attacks.
  * **Secure File Uploads (Multer)**: File size limit (5MB), MIME type verification (whitelist for images, PDFs, ZIPs), and randomized storage paths avoiding directory traversal attacks.

---

## 📂 Project Structure
```text
assignment-4-secure-api/
├── src/
│   ├── config/
│   │   └── jwt.js               # JWT secret & token signing utilities
│   ├── models/
│   │   └── userModel.js         # User model with bcrypt hashing & validation
│   ├── middlewares/
│   │   ├── authMiddleware.js    # JWT verification & RBAC role checks
│   │   └── uploadMiddleware.js  # Multer configuration & file type sanitization
│   ├── controllers/
│   │   └── authController.js    # Register, Login, Profile handlers
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── protectedRoutes.js   # RBAC & Upload routes
│   └── app.js                   # Application entry point & OWASP middlewares
├── uploads/                     # Secure uploaded files destination
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
Server runs on `http://localhost:3003`.

---

## 🧪 Testing with cURL / Postman

### 1. Register a Student
```bash
curl -X POST http://localhost:3003/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nodir Mukhammedov",
    "email": "nodir@astanait.edu.kz",
    "password": "Password123!",
    "role": "student"
  }'
```
*Returns:* `{ success: true, data: { user: {...}, token: "<JWT_TOKEN>" } }`

### 2. Login
```bash
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nodir@astanait.edu.kz",
    "password": "Password123!"
  }'
```

### 3. Access Protected Profile
```bash
curl http://localhost:3003/api/auth/profile \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

### 4. Upload an Assignment File
```bash
curl -X POST http://localhost:3003/api/assignments/upload \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -F "title=Web Tech Lab 4" \
  -F "document=@./README.md"
```
