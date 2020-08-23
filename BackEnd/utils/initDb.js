const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');
const { dbName: databaseName } = require('../config');

const createTable = (dumpName) => {
  return fs.readFileSync(path.resolve(__dirname, '..', dumpName), 'utf-8');
};

const createDb = (dbName) => {
  fs.exists(path.resolve(__dirname, '..', dbName), (isExists) => {
    if (isExists) {
      return;
    }

    console.log('Cannot find db ' + dbName, ', creating new...');
    const testDB = new sqlite3.Database(
      path.resolve(__dirname, '..', dbName),
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );

    const usersSql = createTable('users_dump.sql');
    const usersStatisticsSql = createTable('users_statistics_dump.sql');

    testDB.serialize(() => {
      testDB.exec(usersSql, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Successfully created users table');
        }
      });

      testDB.exec(usersStatisticsSql, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Successfully created users statistics table');
        }
      });
    });

    testDB.close();
  });
};

createDb(databaseName);
