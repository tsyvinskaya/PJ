const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { dbName } = require('../config');

let db;

const getLastWeekStatisticsByUser = (id) => {
  db = new sqlite3.Database(path.resolve(__dirname, '..', dbName));

  return new Promise((resolve) => {
    db.serialize(() => {
      db.all(
        `
          SELECT * FROM users_statistics 
          WHERE user_id = ${id} 
          ORDER BY date DESC 
          LIMIT 7
        `,
        (err, rows) => {
          if (err) {
            return console.error(err);
          }

          resolve(rows);
        }
      );
    });
  });
};

module.exports = {
  getLastWeekStatisticsByUser,
};
