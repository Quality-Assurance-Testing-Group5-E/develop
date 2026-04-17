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

test('Complete user lifecycle: register → login → update → delete', async () => {
  // Register
  const reg = await request(app).post('/api/auth/register').send({
    username: 'lifecycle', email: 'life@cycle.com', fullName: 'Life Cycle', password: 'test123'
  });
  expect(reg.statusCode).toBe(201);

  // Login
  const login = await request(app).post('/api/auth/login').send({ email: 'life@cycle.com', password: 'test123' });
  expect(login.statusCode).toBe(200);
  const token = login.body.token;

  // Update
  const update = await request(app).put('/api/users/me').set('Authorization', `Bearer ${token}`).send({ fullName: 'Updated Name' });
  expect(update.statusCode).toBe(200);

  // Delete
  const del = await request(app).delete('/api/users/me').set('Authorization', `Bearer ${token}`);
  expect(del.statusCode).toBe(200);
});
