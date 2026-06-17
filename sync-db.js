require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME || 'nk-dairy';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'root';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: console.log, 
});

async function runSync() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Connection established.');

    console.log('Forcing sync of all tables (alter: true)...');
    
    // We import the models dynamically so they get registered with Sequelize
    // Note: Since models are TS, we should use ts-node or just let the app do it.
    // Actually, running the TS app is easier! Let's do a trick.
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

runSync();
