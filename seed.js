const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());
const fs = require('fs');
const { sequelize } = require('./src/models/index.ts');

async function seed() {
  console.log("--- Starting Full Database Seed ---");
  try {
    const rawData = fs.readFileSync('database-seed-data.json', 'utf8');
    const data = JSON.parse(rawData);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    // Iterate over the data keys instead of models to ensure we attempt every table
    for (const modelName of Object.keys(data)) {
      if (data[modelName] && data[modelName].length > 0) {
        if (!sequelize.models[modelName]) {
          console.log(`WARNING: Model '${modelName}' is missing from sequelize!`);
          continue;
        }
        console.log(`Seeding ${data[modelName].length} records into ${modelName}...`);
        await sequelize.models[modelName].bulkCreate(data[modelName], { ignoreDuplicates: true });
      }
    }
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log("\nSUCCESS: All data seeded successfully!");
  } catch (err) {
    console.error("\nERROR seeding data:", err.message);
  } finally {
    process.exit();
  }
}
seed();
