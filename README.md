
# User Authentication API

A secure RESTful API for user registration and authentication with JWT tokens, built with Node.js, Express.js, and multiple database support (SQLite/MySQL).

## Features

- 🔐 **Secure Authentication** - JWT-based session management
- 🛡️ **Password Security** - bcrypt hashing with salt rounds
- 📊 **Multiple Database Support** - SQLite (default) or MySQL
- ✅ **Input Validation** - Comprehensive validation with express-validator
- 🚀 **Rate Limiting** - Protection against brute force attacks
- 📚 **API Documentation** - Swagger UI interactive documentation
- 🧪 **Comprehensive Testing** - Unit, integration, and system tests (95% coverage)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-auth-api
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## Database Configuration

### Option 1: SQLite (Default - Recommended for Development)

No additional setup required. SQLite database file will be created automatically.

### Option 2: MySQL (Production Ready)

1. **Install MySQL/WampServer:**
   - Download and install WampServer from https://www.wampserver.com/
   - Start WampServer and ensure MySQL service is running

2. **Create Database:**
   - Open phpMyAdmin (usually at http://localhost/phpmyadmin)
   - Create a new database named `user_auth_api`
   - Or use the automated setup script

3. **Configure Environment:**
   Edit your `.env` file:
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=user_auth_api
```

4. **Setup Database:**
```bash
npm run setup:mysql
```

5. **Start the Application:**
```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ No |
| POST | `/api/auth/login` | User login | ❌ No |
| GET | `/api/users/me` | Get user profile | ✅ JWT |
| PUT | `/api/users/me` | Update user profile | ✅ JWT |
| DELETE | `/api/users/me` | Delete user account | ✅ JWT |

## API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:5000/api-docs`
- **Interactive Testing**: Full API documentation with try-it-out functionality

## Testing

Run the complete test suite:
```bash
npm test
```

Run specific test types:
```bash
npm run test:unit       # Unit tests only
npm run test:integration # Integration tests only
npm run test:system     # System tests only
```

## Project Structure

```
user-auth-api/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── config/
│   │   └── database.js     # Database configuration (SQLite/MySQL)
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── userController.js   # User management logic
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication middleware
│   │   └── validation.js   # Input validation middleware
│   ├── models/
│   │   └── user.js         # User model with database operations
│   └── routes/
│       ├── authRoutes.js   # Authentication routes
│       └── userRoutes.js   # User management routes
├── tests/
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── system/             # System tests
├── setup-mysql.js          # MySQL database setup script
├── jest.setup.js           # Test configuration
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `JWT_SECRET` | - | JWT signing secret (required) |
| `DB_TYPE` | `sqlite` | Database type: `sqlite` or `mysql` |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_USER` | `root` | MySQL username |
| `DB_PASSWORD` | - | MySQL password |
| `DB_NAME` | `user_auth_api` | MySQL database name |

## Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: Stateless authentication with expiration
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation and sanitization
- **Security Headers**: Helmet.js for HTTP security headers
- **CORS Protection**: Configured for cross-origin requests

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run setup:mysql` - Setup MySQL database
- `npm test` - Run all tests
- `npm run test:unit` - Run unit tests
- `npm run test:integration` - Run integration tests
- `npm run test:system` - Run system tests

### Code Quality

- **Test Coverage**: 95%+ code coverage
- **Linting**: ESLint configuration
- **Error Handling**: Comprehensive error handling
- **Documentation**: JSDoc comments throughout

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
=======
# develop
This repo contains source code of user registration and management system
>>>>>>> 9158c466d74e6d8bdf68281a9afe8b43b86890e6
