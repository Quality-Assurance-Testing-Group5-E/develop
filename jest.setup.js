require('dotenv').config({ path: '.env' });

// Ensure JWT_SECRET is set for tests
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'subeko223';
}

// Cleanup database connections after all tests
const db = require('./src/config/database');

afterAll(async () => {
  if (process.env.DB_TYPE === 'mysql' && db && typeof db.end === 'function') {
    await db.end();
  }
});
