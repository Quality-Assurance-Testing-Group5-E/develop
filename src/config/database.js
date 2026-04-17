const path = require('path');
const fs = require('fs');

// Check if using MySQL or SQLite
const useMySQL = process.env.DB_TYPE === 'mysql';

let db;

if (useMySQL) {
  // MySQL Configuration
  const mysql = require('mysql2/promise');

  // Create connection pool for MySQL
  db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'user_auth_api',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Note: Table initialization moved to setup script to avoid async issues during module loading

  // Add initialization function
  db.initializeTable = async () => {
    try {
      await db.execute(`
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
      console.log('✅ MySQL database initialized');
    } catch (error) {
      console.error('❌ MySQL initialization error:', error);
      throw error;
    }
  };

} else {
  // SQLite Configuration (existing)
  const sqlite3 = require('sqlite3').verbose();

  const dbPath = process.env.NODE_ENV === 'test'
    ? ':memory:'
    : path.join(__dirname, '../../database.sqlite');

  db = new sqlite3.Database(dbPath);

  // Initialize SQLite table
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });
}

module.exports = db;