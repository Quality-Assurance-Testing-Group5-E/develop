const User = require('../../src/models/user');
const db = require('../../src/config/database');

beforeAll(async () => {
  // Clear users table for MySQL
  if (process.env.DB_TYPE === 'mysql') {
    await db.execute("DELETE FROM users");
  } else {
    // SQLite cleanup
    return new Promise((resolve) => {
      db.serialize(() => {
        db.run("DELETE FROM users", resolve);
      });
    });
  }
});

test('create and find user by email', async () => {
  const user = await User.create({
    username: 'testuser',
    email: 'test@unit.com',
    fullName: 'Test Unit',
    password: 'pass123'
  });
  expect(user).toHaveProperty('id');
  const found = await User.findByEmail('test@unit.com');
  expect(found.username).toBe('testuser');
});