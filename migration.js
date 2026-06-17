import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'nk-dairy',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

async function runMigration() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const queryInterface = sequelize.getQueryInterface();

    // Add equipmentSolutions column to products table
    await queryInterface.addColumn('products', 'equipmentSolutions', {
      type: DataTypes.JSON,
      allowNull: true,
    });
    console.log('Added equipmentSolutions column to products table.');

  } catch (error) {
    console.error('Unable to connect to the database or alter table:', error);
  } finally {
    await sequelize.close();
  }
}

runMigration();
