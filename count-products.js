const fs = require('fs');
try {
  if (fs.existsSync('.env')) require('dotenv').config({ path: '.env' });
  if (fs.existsSync('.env.local')) require('dotenv').config({ path: '.env.local', override: true });
} catch (e) {}

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME || 'nk-dairy',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

async function check() {
  try {
    await sequelize.authenticate();
    const [results] = await sequelize.query('SELECT COUNT(*) as count FROM products');
    console.log('Products count:', results[0].count);
  } catch(e) {
    console.error(e.message);
  } finally {
    await sequelize.close();
  }
}
check();
