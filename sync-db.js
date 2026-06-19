import { sequelize } from './src/lib/db.js';
import { SeoMetadata } from './src/models/SeoMetadata.js';

async function updateSchema() {
  try {
    console.log('Connecting to DB...');
    await sequelize.authenticate();
    console.log('Altering SeoMetadata table...');
    await SeoMetadata.sync({ alter: true });
    console.log('Success! metaKeywords is now TEXT.');
  } catch (error) {
    console.error('Failed to sync:', error);
  } finally {
    process.exit(0);
  }
}

updateSchema();
