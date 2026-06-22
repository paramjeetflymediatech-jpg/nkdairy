const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('nk-dairy', 'root', 'root', { host: 'localhost', dialect: 'mysql', logging: false });
const Product = sequelize.define('Product', { id: { type: DataTypes.INTEGER, primaryKey: true }, slug: { type: DataTypes.STRING }, description: { type: DataTypes.TEXT('long') } }, { tableName: 'products', timestamps: true });

async function run() {
  await sequelize.authenticate();
  const prod = await Product.findOne({ where: { slug: 'cream-separator' } });
  if (prod) {
    console.log(prod.description);
  } else {
    console.log("NOT FOUND");
  }
  process.exit();
}
run();
