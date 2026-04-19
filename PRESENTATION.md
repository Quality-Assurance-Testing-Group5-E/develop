# User Authentication API - Presentation Slides

## Slide 1: Title Slide (1 min)
---
# **User Authentication API**
## RESTful API for Secure User Registration & Management

**Team Members:**
- Kizito Subek
- Emmanuel Likambo
- Gloria
- Okiror Hillary
- Patrick

---

## Slide 2: Project Overview (2 mins)
---
# **What is This Project?**

A production-ready **REST API** for user authentication and profile management with:

✓ User registration & login  
✓ JWT-based authentication  
✓ Password encryption (bcrypt)  
✓ Profile management (update/delete)  
✓ Input validation & error handling  
✓ Security best practices (Helmet, rate limiting)  
✓ Comprehensive testing (unit, integration, system)  

**Tech Stack:**
- Node.js + Express
- SQLite (database)
- JWT (authentication)
- Jest (testing)
- Swagger UI (API documentation)

---

## Slide 3: API Endpoints (2 mins)
---
# **Available Endpoints**

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---|
| `/api/auth/register` | POST | Create new user | ❌ |
| `/api/auth/login` | POST | Authenticate user | ❌ |
| `/api/users/me` | GET | Get user profile | ✅ JWT |
| `/api/users/me` | PUT | Update profile | ✅ JWT |
| `/api/users/me` | DELETE | Delete account | ✅ JWT |

**Demonstration URLs:**
- Register: `POST http://localhost:5000/api/auth/register`
- Login: `POST http://localhost:5000/api/auth/login`
- Profile: `GET http://localhost:5000/api/users/me`

---

## Slide 4: Architecture Diagram (1 min)
---
# **System Architecture**

```
┌─────────────────────────────────────────────────────┐
│                   Client (Swagger UI / Postman)     │
└─────────────────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────┐
│                    Express Server                    │
│  ┌──────────────────────────────────────────────┐  │
│  │  Routes (authRoutes, userRoutes)             │  │
│  │  ↓                                            │  │
│  │  Controllers (authController, userController)│  │
│  │  ↓                                            │  │
│  │  Middleware (auth, validation, helmet)       │  │
│  │  ↓                                            │  │
│  │  Models (User model)                         │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────┐
│              SQLite Database                         │
│  users table: id, username, email, password_hash    │
└─────────────────────────────────────────────────────┘
```

---

## Slide 5: Security Features (2 mins)
---
# **Security Implementation**

🔒 **Password Hashing**
- Bcrypt with 10 salt rounds
- Passwords NEVER stored in plain text

🔑 **JWT Authentication**
- Signed tokens with 1-day expiration
- Token required for profile operations

⚔️ **Middleware Protection**
- Helmet.js (HTTP security headers)
- Rate limiting (prevent brute force)
- Input validation (reject invalid data)

🚨 **Error Handling**
- Generic "Invalid credentials" for login failures
- Prevents user enumeration attacks
- Proper HTTP status codes

---

## Slide 6: Database Schema (1 min)
---
# **Database Structure**

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Key Design:**
- Unique constraints on email & username
- Timestamps for audit trail
- Passwords hashed before storage

---

## Slide 7: Development Process (1 min)
---
# **How We Built It**

1. **Requirements Analysis** → Define endpoints & data models
2. **Design** → Plan architecture & security
3. **Implementation** → Code controllers, models, routes
4. **Testing** → Write unit, integration, system tests
5. **Documentation** → Swagger/Postman, defect log
6. **CI Ready** → GitHub Actions workflow setup

**Timeline:** 2-3 weeks  
**Team Size:** 5 developers  
**Collaboration:** GitHub, daily standups, code reviews

---

## Slide 8: Testing Strategy (2 mins)
---
# **Three Levels of Testing**

### **Unit Tests** (authController.test.js, userModel.test.js)
- Test individual functions in isolation
- Use mocks (no real database)
- Verify: registration validation, password hashing, login logic
- ✅ **Status:** 6 tests passed

### **Integration Tests** (authEndpoints.test.js)
- Test real API endpoints with real database
- Verify: register endpoint works, login returns JWT token
- ✅ **Status:** 2 tests passed

### **System Tests** (workflow.test.js)
- Test complete user journey: register → login → update → delete
- Real database, real endpoints
- ✅ **Status:** 1 test passed

**Coverage Reporting:** Generated automatically by Jest and uploaded in CI

---

## Slide 9: Test Results Summary (1 min)
---
# **All Tests Passing ✅**

```
npm run test:unit          → 6/6 passed
npm run test:integration   → 2/2 passed  
npm run test:system        → 1/1 passed
────────────────────────────────────────
TOTAL: 9 tests passed | 0 failed
Coverage: report generated automatically
```

**What We Test:**
- Duplicate email detection
- Password validation
- Token generation
- JWT verification
- Profile update
- Account deletion

---

## Slide 10: Defect Management (1 min)
---
# **Quality Assurance**

**Defects Found & Resolved:** 5 issues
- Invalid credentials ambiguity (fixed)
- Missing test directories (fixed)
- Database cleanup during tests (fixed)
- Rate limiting edge cases (fixed)
- Token expiration handling (fixed)

**All defects logged in:** `defect-log.md`

**Current Status:** ✅ All resolved  
**Regression Tests:** Added for each defect

---

## Slide 11: CI Pipeline (1 min)
---
# **Continuous Integration**

**Automated workflow on pushes to `main`/`develop` and PRs to `main`:**

1. ✅ Checkout code
2. ✅ Setup Node.js 18 and install dependencies  
3. ✅ Start MySQL service for CI
4. ✅ Run `npm run setup:mysql`
5. ✅ Run `npm test`
6. ✅ Upload coverage reports to Codecov  

**Benefits:**
- Catch bugs early
- Prevent broken code from merging
- Consistent quality standards
- Faster feedback loop

---

## Slide 12: API Documentation (1 min)
---
# **How to Use the API**

**Swagger UI** (automatic documentation)
- Interactive API explorer
- Try endpoints without code
- View request/response schemas

**Postman Collection** (included)
- `postman_collection.json`
- Pre-built requests
- Can test all endpoints

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "password": "secure123"
  }'
```

---

## Slide 13: Live Demo Setup (1 min)
---
# **LIVE DEMONSTRATION SETUP**

**What we'll demonstrate:**

1. **Start the API server**  
   `npm start` → Server runs on port 5000

2. **Open Swagger UI**  
   Navigate to `http://localhost:5000/api-docs`

3. **Test Registration**  
   POST /api/auth/register with new user

4. **Test Login**  
   POST /api/auth/login with credentials

5. **Test Profile Access**  
   GET /api/users/me with JWT token

6. **Test Update**  
   PUT /api/users/me to change profile

7. **Test Deletion**  
   DELETE /api/users/me to remove account

---

## Slide 14: DEMO PART 1 - Register User (3 mins)
---
# **LIVE DEMO: User Registration**

**Step 1:** Open Swagger UI at `http://localhost:5000/api-docs`

**Step 2:** Click on "Register" endpoint

**Step 3:** Click "Execute"

**Request Body:**
```json
{
  "username": "demo_user",
  "email": "demo@example.com",
  "fullName": "Demo User",
  "password": "DemoPass123"
}
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "demo_user",
    "email": "demo@example.com",
    "fullName": "Demo User"
  }
}
```

**Status Code:** 201 (Created) ✅

---

## Slide 15: DEMO PART 2 - Login & Get Token (3 mins)
---
# **LIVE DEMO: User Login**

**Step 1:** Click on "Login" endpoint in Swagger

**Step 2:** Click "Execute"

**Request Body:**
```json
{
  "email": "demo@example.com",
  "password": "DemoPass123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "demo_user",
    "email": "demo@example.com",
    "fullName": "Demo User"
  }
}
```

**Status Code:** 200 (OK) ✅

**Save the token for next step!**

---

## Slide 16: DEMO PART 3 - Get Profile with Token (2 mins)
---
# **LIVE DEMO: View User Profile**

**Step 1:** Click "Get Profile" endpoint

**Step 2:** Scroll down - enter the JWT token from login:
- Authorization Type: Bearer Token
- Paste the token from previous step

**Step 3:** Click "Execute"

**Expected Response:**
```json
{
  "id": 1,
  "username": "demo_user",
  "email": "demo@example.com",
  "full_name": "Demo User",
  "created_at": "2026-04-15T10:30:00.000Z"
}
```

**Status Code:** 200 (OK) ✅

**Note:** Without token or with wrong token → 401 (Unauthorized) ❌

---

## Slide 17: DEMO PART 4 - Update Profile (2 mins)
---
# **LIVE DEMO: Update Profile**

**Step 1:** Click "Update Profile" endpoint

**Step 2:** Add Bearer token (same as before)

**Step 3:** Enter new data:
```json
{
  "fullName": "Demo User Updated",
  "email": "newemail@example.com"
}
```

**Step 4:** Click "Execute"

**Expected Response:**
```json
{
  "message": "Profile updated successfully"
}
```

**Status Code:** 200 (OK) ✅

**Verify:** Now "Full Name" and email are changed in database

---

## Slide 18: DEMO PART 5 - Delete Account (2 mins)
---
# **LIVE DEMO: Delete Account**

**Step 1:** Click "Delete Account" endpoint

**Step 2:** Add Bearer token (same token still valid)

**Step 3:** Click "Execute"

**Expected Response:**
```json
{
  "message": "Account deleted successfully"
}
```

**Status Code:** 200 (OK) ✅

**Verify:** Try to login with deleted credentials → Will fail ❌

---

## Slide 19: Running the Test Suite (2 mins)
---
# **Running Automated Tests**

**Show test execution:**

```bash
# Run unit tests
npm run test:unit
# Output: ✓ 6 passed

# Run integration tests
npm run test:integration
# Output: ✓ 2 passed

# Run system tests
npm run test:system
# Output: ✓ 1 passed

# Run all with coverage
npm test
# Output: 9 passed | Coverage report generated
```

**All tests automatically verify:**
- Registration works correctly
- Login generates valid tokens
- Profile operations work
- Database operations function
- Error handling is correct

---

## Slide 20: Key Achievements (1 min)
---
# **Project Summary**

✅ **Fully functional REST API** with 5 endpoints

✅ **Enterprise-grade security**
- Password hashing (bcrypt)
- JWT authentication  
- Input validation
- Rate limiting

✅ **Comprehensive testing**
- 9 automated tests
- Coverage reports generated by Jest
- Unit, integration, system levels

✅ **Professional documentation**
- Swagger UI
- Postman collection
- Defect log & group report

✅ **CI automation in place**
- GitHub Actions workflow
- MySQL-backed CI setup
- Codecov coverage upload

---

## Slide 21: Q&A (2 mins)
---
# **Questions & Discussion**

**Topics We Can Discuss:**

- How the JWT authentication works
- Why we use Bcrypt for passwords
- Testing strategies & coverage
- Security best practices
- Database design decisions
- Deployment considerations
- Scaling the API

**Thank you for your attention!**

---

## Slide 22: Contact & Resources
---
# **Project Resources**

**Repository Files:**
- `src/` — Application code
- `tests/` — Test suite
- `postman_collection.json` — API testing
- `README.md` — Setup instructions
- `group-report.md` — Detailed report
- `defect-log.md` — Issues & resolutions

**Run the API:**
```bash
npm install      # Install dependencies
npm start        # Start on port 5000
npm test         # Run all tests
npm run dev      # Development mode (auto-reload)
```

**Access Swagger UI:**
```
http://localhost:5000/api-docs
```

---
