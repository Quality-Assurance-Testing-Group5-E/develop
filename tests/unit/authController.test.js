const { register, login } = require('../../src/controllers/authController');
const User = require('../../src/models/user');
const bcrypt = require('bcrypt');

// Mock the User model
jest.mock('../../src/models/user');

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test_secret_key';
  });

  describe('register', () => {
    test('should register a new user successfully', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@test.com', fullName: 'Test User' };
      User.findByEmail.mockResolvedValue(null);
      User.findByUsername.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);

      const req = {
        body: { username: 'testuser', email: 'test@test.com', fullName: 'Test User', password: 'test123' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('registered')
      }));
    });

    test('should return 400 if email already exists', async () => {
      const existingUser = { id: 1, username: 'existing', email: 'test@test.com' };
      User.findByEmail.mockResolvedValue(existingUser);

      const req = {
        body: { username: 'newuser', email: 'test@test.com', fullName: 'New User', password: 'test123' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: 'Email already registered'
      }));
    });
  });

  describe('login', () => {
    test('should login a user successfully', async () => {
      const passwordHash = await bcrypt.hash('test123', 10);
      const mockUser = { 
        id: 1, 
        username: 'testuser', 
        email: 'test@test.com',
        full_name: 'Test User',
        password_hash: passwordHash
      };
      User.findByEmail.mockResolvedValue(mockUser);

      const req = {
        body: { email: 'test@test.com', password: 'test123' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        token: expect.any(String)
      }));
    });

    test('should return 401 if user not found', async () => {
      User.findByEmail.mockResolvedValue(null);

      const req = {
        body: { email: 'test@test.com', password: 'test123' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: 'Invalid credentials'
      }));
    });

    test('should return 401 if password is incorrect', async () => {
      const passwordHash = await bcrypt.hash('test123', 10);
      const mockUser = { 
        id: 1, 
        username: 'testuser', 
        email: 'test@test.com',
        password_hash: passwordHash
      };
      User.findByEmail.mockResolvedValue(mockUser);

      const req = {
        body: { email: 'test@test.com', password: 'wrongpassword' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: 'Invalid credentials'
      }));
    });
  });
});
