const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());
const { sequelize } = require('./src/lib/db.ts');

async function run() {
  try {
    const res = await sequelize.query("SHOW COLUMNS FROM products LIKE 'pageSections'");
    console.log(res[0]);
  } catch(e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
run();
