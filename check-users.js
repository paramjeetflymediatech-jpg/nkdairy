const fs = require('fs');
try {
  if (fs.existsSync('.env')) require('dotenv').config({ path: '.env' });
  if (fs.existsSync('.env.local')) require('dotenv').config({ path: '.env.local', override: true });
} catch (e) {}
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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

const User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING
}, { tableName: 'users', timestamps: true });

async function fix() {
  try {
    await sequelize.authenticate();
    const hash = await bcrypt.hash('admin123', 10);
    await User.update({ password: hash }, { where: { email: 'admin@nkdairy.com' } });
    console.log('Password fixed to be bcrypt hash of "admin123".');
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}
fix();
