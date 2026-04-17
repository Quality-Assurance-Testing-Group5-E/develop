const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const db = require('./config/database');

const app = express();

// Initialize database table if using MySQL
if (process.env.DB_TYPE === 'mysql') {
  db.initializeTable().catch(err => {
    console.error('Failed to initialize MySQL table:', err);
    process.exit(1);
  });
}

app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
});
if (process.env.NODE_ENV !== 'test') {
  app.use('/api/', limiter);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true
  }
}));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;