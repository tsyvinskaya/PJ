const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { dbName } = require('../config');

let db;

const getUsers = (options = { page: 1, limit: 50 }) => {
  const { page, limit } = options;
  db = new sqlite3.Database(path.resolve(__dirname, '..', dbName));

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const query = `
        SELECT users.id, users.first_name, users.last_name, users.email, users.gender, users.ip_address, sum(users_statistics.clicks) AS total_clicks, sum(users_statistics.page_views) AS total_page_views
        FROM users
        LEFT JOIN users_statistics ON users.id = users_statistics.user_id
        GROUP BY id 
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}
      `;
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows);
      });
    });
  });
};

const getUserById = (id) => {
  db = new sqlite3.Database(path.resolve(__dirname, '..', dbName));

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.each(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(row);
      });
    });
  });
};

const getPagesAmount = (options = { limit: 50 }) => {
  const { limit } = options;
  db = new sqlite3.Database(path.resolve(__dirname, '..', dbName));

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.each('SELECT COUNT(*) FROM users', (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(Math.ceil(Object.values(row)[0] / limit));
      });
    });
  });
};

module.exports = {
  getUsers,
  getPagesAmount,
  getUserById,
};
