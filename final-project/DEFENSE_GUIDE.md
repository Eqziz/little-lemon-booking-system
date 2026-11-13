# Final Project Defense Guide & Exam Reference

**Course:** Web Technologies 2 (Back End)  
**Institution:** Astana IT University, School of Computer Engineering  
**Student:** Nodir Mukhammedov  
**Project:** EduPortal — Academic Course & Submission REST API  
**Weight:** 40% of Final Grade (100% Final Exam)

---

## 🎯 1. Course Rubric Alignment (How this Project Meets Criteria)

| Rubric Indicator | Criteria for Excellent (90–100%) | Implementation in this Project |
| :--- | :--- | :--- |
| **1. Fundamental Principles** | Clearly explains principles, compares algorithms, provides examples. | Demonstrates **MVC Architecture**, **Client-Server REST model**, stateless **JWT authentication**, and HTTP RFC 7231 standards. |
| **2. Data Structures** | Confidently and optimally applies lists, trees, hash tables. | In-memory indexing with **Hash Sets** for $O(1)$ lookups, JSON nested document structures, Mongoose/B-Tree database indexes. |
| **3. Algorithm Complexity** | Accurately determines and compares time & space complexity. | Password hashing with adaptive key derivation function ($\text{work factor} = 2^{10}$), token verification $O(1)$, binary search on indexed IDs. |
| **4. Code Quality** | Clean, well-structured, thoroughly tested. | Modular layered structure: `config/`, `models/`, `controllers/`, `middlewares/`, `routes/`. Centralized error handling. |
| **5. Problem Solving** | Solves problems optimally, shows creativity and deep understanding. | Solves real-world challenges: SQL/NoSQL injection prevention, brute-force mitigation, secure multipart file handling. |

---

## 💡 2. Key Theoretical Questions & Answers for Defense

### Q1: What is the architectural difference between MVC and a decoupled REST API?
* **Answer:**
  * **MVC (Assignment 1):** The Controller queries the Model and renders an HTML View on the server (Server-Side Rendering / SSR via EJS). The client receives pre-rendered HTML.
  * **Decoupled REST API (Final Project & Assignment 4):** The server is **stateless** and only returns raw data (JSON). Any client (React, Vue, iOS, Android) can consume the API independently. This decouples presentation logic from business logic.

---

### Q2: How does JWT Authentication work and why is it preferred over Session Cookies?
* **Answer:**
  * A **JWT (JSON Web Token)** consists of three base64url-encoded parts: `Header.Payload.Signature`.
  * The server signs the payload using a cryptographic secret (`HMAC-SHA256`).
  * **Why it's preferred:**
    1. **Statelessness:** The server does not store session IDs in memory or a database (unlike sessions). This allows horizontal scaling across multiple servers without sticky sessions or shared Redis cache.
    2. **Mobile & Cross-domain friendly:** JWT is easily passed in the `Authorization: Bearer <token>` header, bypassing Cross-Origin Cookie restrictions.

---

### Q3: What is Password Salting and why is Bcrypt better than plain SHA-256?
* **Answer:**
  * **Salting:** Appending a unique cryptographically random string to the password before hashing. This ensures two identical passwords produce completely different hashes, neutralizing **Rainbow Table** attacks.
  * **Bcrypt vs SHA-256:** SHA-256 is designed to be extremely fast (computed in microseconds), making it vulnerable to GPU brute-force attacks (billions of hashes/sec). Bcrypt is deliberately **slow and resource-intensive** using a configurable **work factor** ($2^{\text{cost}}$ rounds). Even with specialized hardware, attacking bcrypt is computationally unfeasible.

---

### Q4: How does this project prevent the OWASP Top 10 Security Vulnerabilities?
* **Answer:**
  1. **Injection (SQLi / NoSQL Injection):** Sanitizing inputs, strict data typing, and using ORM/ODM parameterized queries rather than raw string concatenation.
  2. **Broken Authentication:** Bcrypt with 10 rounds, short-lived JWT tokens, rate limiting on login routes.
  3. **Security Misconfiguration:** `helmet()` middleware sets critical security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Content-Security-Policy`).
  4. **Unrestricted File Upload:** `multer` restricts allowed extensions (whitelist only), validates file sizes (10MB limit), and writes files with randomized GUID names to prevent overwriting or directory traversal.
  5. **DDoS & Brute Force:** `express-rate-limit` throttles requests per IP window.

---

### Q5: Explain the Time & Space Complexity of the Backend Operations
* **Search / Find by ID:**
  * In MongoDB (with B-Tree index on `_id`): $O(\log N)$ time complexity.
  * In-memory hash lookup: $O(1)$ average time complexity.
* **JWT Verification:**
  * $O(1)$ cryptographic HMAC check; no database query needed if roles are in payload.
* **Bcrypt Password Verification:**
  * Adaptive time complexity $O(2^{\text{cost}})$ deliberately tuned to $\approx 60-100\text{ ms}$ per verification to prevent offline dictionary attacks.
