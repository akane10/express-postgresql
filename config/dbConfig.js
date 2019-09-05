const { dbname, dbuser, dbpassword } = require('./config');

module.exports = {
  development: {
    username: dbuser,
    password: dbpassword,
    database: dbname,
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: dbuser,
    password: dbpassword,
    database: dbname,
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
