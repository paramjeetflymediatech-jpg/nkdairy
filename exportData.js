const fs = require('fs');
const { sequelize } = require('./src/lib/db.ts');
require('./src/models/index.ts');

async function run() {
  try {
    console.log("Exporting all database records...");
    const data = {};
    for (const modelName of Object.keys(sequelize.models)) {
      const records = await sequelize.models[modelName].findAll({ raw: true });
      data[modelName] = records;
      console.log(`Exported ${records.length} records from ${modelName}`);
    }
    fs.writeFileSync('database-seed-data.json', JSON.stringify(data, null, 2));
    const seedScript = `
const fs = require('fs');
const { sequelize } = require('./src/lib/db.ts');
require('./src/models/index.ts');

async function seed() {
  console.log("--- Starting Full Database Seed ---");
  try {
    const rawData = fs.readFileSync('database-seed-data.json', 'utf8');
    const data = JSON.parse(rawData);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    for (const modelName of Object.keys(sequelize.models)) {
      if (data[modelName] && data[modelName].length > 0) {
        console.log(\`Seeding \${data[modelName].length} records into \${modelName}...\`);
        await sequelize.models[modelName].bulkCreate(data[modelName], { ignoreDuplicates: true });
      }
    }
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log("\\nSUCCESS: All data seeded successfully!");
  } catch (err) {
    console.error("\\nERROR seeding data:", err.message);
  } finally {
    process.exit();
  }
}
seed();
`;
    fs.writeFileSync('seed.js', seedScript);
    console.log('\nSUCCESS: Created database-seed-data.json and seed.js!');
  } catch (e) {
    console.error("Export Error:", e);
  } finally {
    process.exit();
  }
}
run();
