require('dotenv').config();

module.exports = {
  dbName: process.env.DB_NAME || 'test_task.db',
  port: process.env.PORT || 3001,
};
