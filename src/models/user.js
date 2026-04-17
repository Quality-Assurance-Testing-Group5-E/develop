const db = require('../config/database');
const bcrypt = require('bcrypt');

// Check database type
const useMySQL = process.env.DB_TYPE === 'mysql';

class User {
  static async create({ username, email, fullName, password }) {
    const passwordHash = await bcrypt.hash(password, 10);

    if (useMySQL) {
      // MySQL version
      try {
        const [result] = await db.execute(
          `INSERT INTO users (username, email, full_name, password_hash) VALUES (?, ?, ?, ?)`,
          [username, email, fullName, passwordHash]
        );
        return { id: result.insertId, username, email, fullName };
      } catch (error) {
        throw error;
      }
    } else {
      // SQLite version
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (username, email, full_name, password_hash) VALUES (?, ?, ?, ?)`,
          [username, email, fullName, passwordHash],
          function(err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, username, email, fullName });
          }
        );
      });
    }
  }

  static async findByEmail(email) {
    if (useMySQL) {
      // MySQL version
      try {
        const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
        return rows[0] || null;
      } catch (error) {
        throw error;
      }
    } else {
      // SQLite version
      return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    }
  }

  static async findByUsername(username) {
    if (useMySQL) {
      // MySQL version
      try {
        const [rows] = await db.execute(`SELECT * FROM users WHERE username = ?`, [username]);
        return rows[0] || null;
      } catch (error) {
        throw error;
      }
    } else {
      // SQLite version
      return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    }
  }

  static async findById(id) {
    if (useMySQL) {
      // MySQL version
      try {
        const [rows] = await db.execute(`SELECT id, username, email, full_name, created_at FROM users WHERE id = ?`, [id]);
        return rows[0] || null;
      } catch (error) {
        throw error;
      }
    } else {
      // SQLite version
      return new Promise((resolve, reject) => {
        db.get(`SELECT id, username, email, full_name, created_at FROM users WHERE id = ?`, [id], (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    }
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];

    if (updates.fullName) {
      fields.push(useMySQL ? 'full_name = ?' : 'full_name = ?');
      values.push(updates.fullName);
    }
    if (updates.email) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    if (updates.password) {
      const hash = await bcrypt.hash(updates.password, 10);
      fields.push('password_hash = ?');
      values.push(hash);
    }

    if (fields.length === 0) return null;

    if (useMySQL) {
      fields.push('updated_at = CURRENT_TIMESTAMP');
    } else {
      fields.push('updated_at = CURRENT_TIMESTAMP');
    }

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

    if (useMySQL) {
      // MySQL version
      try {
        const [result] = await db.execute(query, values);
        return result.affectedRows;
      } catch (error) {
        throw error;
      }
    } else {
      // SQLite version
      return new Promise((resolve, reject) => {
        db.run(query, values, function(err) {
          if (err) return reject(err);
          resolve(this.changes);
        });
      });
    }
  }

  static async delete(id) {
    if (useMySQL) {
      // MySQL version
      try {
        const [result] = await db.execute(`DELETE FROM users WHERE id = ?`, [id]);
        return result.affectedRows;
      } catch (error) {
        throw error;
      }
    } else {
      // SQLite version
      return new Promise((resolve, reject) => {
        db.run(`DELETE FROM users WHERE id = ?`, [id], function(err) {
          if (err) return reject(err);
          resolve(this.changes);
        });
      });
    }
  }
}

module.exports = User;