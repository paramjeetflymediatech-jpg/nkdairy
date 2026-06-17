const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());
const { sequelize } = require('./src/lib/db.ts');
const { DataTypes } = require("sequelize");

async function run() {
  const queryInterface = sequelize.getQueryInterface();
  try {
    await queryInterface.addColumn('products', 'faqs', {
      type: DataTypes.JSON,
      allowNull: true,
    });
    console.log("Column faqs added successfully to products.");
  } catch (error) {
    if (error.message.includes('Duplicate column name')) {
        console.log("Column faqs already exists.");
    } else {
        console.error("Error:", error.message);
    }
  } finally {
    process.exit(0);
  }
}

run();
