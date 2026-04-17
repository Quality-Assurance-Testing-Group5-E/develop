const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/config/database');

beforeEach(async () => {
  // Clear users table for MySQL
  if (process.env.DB_TYPE === 'mysql') {
    await db.execute("DELETE FROM users");
  } else {
    // SQLite cleanup
    return new Promise((resolve) => {
      db.run("DELETE FROM users", resolve);
    });
  }
});

describe('Auth Endpoints', () => {
  test('POST /api/auth/register - success', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'jane', email: 'jane@test.com', fullName: 'Jane Doe', password: 'test123' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/registered/);
  });

  test('POST /api/auth/login - success', async () => {
    await request(app).post('/api/auth/register').send({ username: 'john', email: 'john@test.com', fullName: 'John', password: 'pass123' });
    const res = await request(app).post('/api/auth/login').send({ email: 'john@test.com', password: 'pass123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
