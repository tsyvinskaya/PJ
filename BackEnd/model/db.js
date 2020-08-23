const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { dbName } = require('../config');

const healthCheck = () => {
  new sqlite3.Database(path.resolve(__dirname, '..', dbName), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connected to database');
    }
  });
};

module.exports = {
  healthCheck,
};
