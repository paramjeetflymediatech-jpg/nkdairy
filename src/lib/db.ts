import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || 'nk-dairy';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'root';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false, // Set to true to see SQL queries
});

// Keep track of sync state globally to avoid concurrent deadlocks in Next.js
const globalAny: any = global;

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    
    // Synchronize models automatically (temporarily enabled for production to fix schema)
    if (!globalAny.isSynced) {
      globalAny.isSynced = true;
      try {
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
      } catch (syncError) {
        console.error('Error during database sync:', syncError);
      }
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
