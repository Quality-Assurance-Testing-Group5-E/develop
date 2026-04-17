const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupMySQL() {
  // Create connection without specifying database initially
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    // Create database if it doesn't exist (use query instead of execute for DDL)
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'user_auth_api'}`);
    console.log('✅ Database created successfully');

    // Close the initial connection
    await connection.end();

    // Create new connection to the specific database
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'user_auth_api'
    });

    // Create users table (use query for DDL)
    await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(191) UNIQUE NOT NULL,
        email VARCHAR(191) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB
    `);
    console.log('✅ Users table created successfully');

    await dbConnection.end();
    console.log('🎉 MySQL setup complete!');
    console.log('You can now run: npm start');

  } catch (error) {
    console.error('❌ MySQL setup failed:', error);
    process.exit(1);
  }
}

setupMySQL();