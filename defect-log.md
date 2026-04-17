# Defect Log

| ID   | Description                                      | Severity | Status    | Resolution                                       |
|------|--------------------------------------------------|----------|-----------|--------------------------------------------------|
| DEF-1 | Password hashing fails on SQLite INSERT         | High     | Closed    | Fixed by awaiting bcrypt.hash before insert      |
| DEF-2 | JWT secret missing gives unclear error          | Medium   | Closed    | Added .env.example and validation middleware     |
| DEF-3 | Update profile allows duplicate email for same user | Medium | Closed    | Added check to exclude own ID in findByEmail     |
| DEF-4 | Rate limiting too strict for test suite         | Low      | Closed    | Disabled rate limiter in test env via NODE_ENV   |
|DEF-5 | 500 error on delete non-existent user           | Medium   | Closed    | Added 404 check before delete                    |