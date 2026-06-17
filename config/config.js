const fs = require('fs');
try {
  // Always load .env first if it exists
  if (fs.existsSync('.env')) {
    require('dotenv').config({ path: '.env' });
  }
  // Then load .env.local to override/add any local variables
  if (fs.existsSync('.env.local')) {
    require('dotenv').config({ path: '.env.local', override: true });
  }
} catch (error) {
  console.log('Error loading dotenv, relying on system environment variables.');
}

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'nk-dairy',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
};
