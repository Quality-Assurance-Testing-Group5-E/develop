# Group Report – User Authentication API

**Team Members:** Kizito Subek, Emmanuel Tombe, Gloria, Okiror Hillary, Patrick

## 1. Introduction
We developed a RESTful API for user registration and authentication with full CRUD operations on user profiles. The system ensures secure password storage (bcrypt), JWT-based sessions, input validation, and error handling.

## 2. API Design
- **Endpoints**: POST /register, POST /login, GET/PUT/DELETE /users/me
- **Security**: Helmet, rate limiting, JWT expiry (1 day), password hashing.
- **Data Storage**: SQLite (in-memory for testing, file for development).

## 3. Quality Assurance Strategy
We applied three testing levels:
- **Unit Testing**: Model methods and controller logic (isolated with Jest).
- **Integration Testing**: API endpoints using Supertest with a real in-memory database.
- **System Testing**: End-to-end user workflows (register → login → update → delete).

## 4. Test Automation & CI/CD pipelines
- Automated tests run on every push via GitHub Actions.
- Coverage thresholds enforced (minimum 85%).
- Postman collection shared for manual exploration.

## 5. Defect Management
We logged 5 defects during development (see defect-log.md). All were resolved and regression tests added.

## 6. Continuous Integration
The CI pipeline (`.github/workflows/ci.yml`) installs dependencies, runs all tests, and uploads coverage reports. This ensures that only verified code is merged.

## 7. Results & Evidence
- All 9 tests pass.
- Code coverage > 90%.
- API responds with proper HTTP status codes and validation messages.

## 8. Conclusion
The API meets all requirements: CRUD, validation, security, and comprehensive testing. The CI/CD pipeline guarantees reliability.