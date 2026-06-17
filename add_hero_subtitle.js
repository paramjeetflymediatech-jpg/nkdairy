const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'nk-dairy',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: console.log,
  }
);

async function run() {
  const queryInterface = sequelize.getQueryInterface();
  try {
    await queryInterface.addColumn('products', 'heroSubtitle', {
      type: DataTypes.STRING,
      allowNull: true,
    });
    console.log("Column heroSubtitle added successfully to products.");
  } catch (error) {
    if (error.message && error.message.includes('Duplicate column name')) {
        console.log("Column heroSubtitle already exists.");
    } else {
        console.error("Error:", error.message);
    }
  } finally {
    process.exit(0);
  }
}

run();
