# Assignment 1: Introduction to Web Technologies (Back End)

**Course:** Web Technologies 2 (Back End) — Astana IT University  
**Student:** Nodir Mukhammedov  
**Year / Trimester:** 2nd year, 5th trimester  
**Attestation:** 1st Attestation (Weight: 30%)

---

## 📌 Project Overview
This project satisfies all requirements for **Assignment 1** as outlined in the university syllabus:
* Implementation of the **Model-View-Controller (MVC)** architectural pattern.
* Setting up server-side environment with **Node.js** and **Express.js**.
* Serving static files (CSS stylesheets).
* Server-side dynamic rendering with **EJS**.
* Request handling: HTML form submissions (POST), URL parameters, and JSON API dual-mode response.

---

## 📂 Architecture (MVC)
```text
assignment-1-intro/
├── public/
│   └── css/style.css            # Static styles
├── src/
│   ├── models/
│   │   └── userModel.js         # Model: Encapsulates data & business logic
│   ├── views/
│   │   ├── index.ejs            # View: Home landing page
│   │   ├── users.ejs            # View: Rendered dynamic user list
│   │   └── newUser.ejs          # View: Form for creating new user
│   ├── controllers/
│   │   └── userController.js    # Controller: Mediates between Model and Views
│   ├── routes/
│   │   └── userRoutes.js        # Routes: Maps HTTP methods/URLs to controllers
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

### 2. Start the Server
```bash
npm start
```
Or with auto-reload (development):
```bash
npm run dev
```

### 3. Open in Browser
* **Home Page:** [http://localhost:3000/](http://localhost:3000/)
* **Users Directory:** [http://localhost:3000/users](http://localhost:3000/users)
* **Add New User:** [http://localhost:3000/users/new](http://localhost:3000/users/new)
* **REST JSON API:** [http://localhost:3000/api/users](http://localhost:3000/api/users)

---

## 🧪 Testing with cURL / Postman
```bash
# Get all users via JSON API
curl http://localhost:3000/api/users

# Submit new user via POST form
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test+User&role=QA+Engineer&email=test@astanait.edu.kz"
```
