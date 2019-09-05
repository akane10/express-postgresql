/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
if (process.env.NODE_ENV === 'development') {
  module.exports = {
    dbname: process.env.DBNAME,
    dbuser: process.env.DBUSER,
    dbpassword: process.env.DBPASSWORD,
    secretkey: process.env.SECRETKEY
  };
}

if (process.env.NODE_ENV === 'test') {
  const envConfig = dotenv.parse(fs.readFileSync('.env.test'));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
  module.exports = {
    dbname: process.env.DBNAME,
    dbuser: process.env.DBUSER,
    dbpassword: process.env.DBPASSWORD,
    secretkey: process.env.SECRETKEY
  };
}
