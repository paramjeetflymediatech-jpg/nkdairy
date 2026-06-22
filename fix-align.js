require('dotenv').config({ path: ['.env.local', '.env'] });
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'nk-dairy', 
  process.env.DB_USER || 'root', 
  process.env.DB_PASSWORD || process.env.DB_PASS || 'root', 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING },
  pageSections: { type: DataTypes.JSON }
}, { tableName: 'products', timestamps: true });

async function fix() {
  try {
    await sequelize.authenticate();
    const products = await Product.findAll();
    
    for (const product of products) {
      if (product.pageSections && Array.isArray(product.pageSections)) {
        let updated = false;
        const newSections = product.pageSections.map((sec, idx) => {
          // The user wants: 1st section (idx 0) -> Left side content, Right side image (so alignment = 'right')
          // 2nd section (idx 1) -> Right side content, Left side image (so alignment = 'left')
          const desiredAlignment = idx % 2 === 0 ? 'right' : 'left';
          
          if (sec.alignment !== desiredAlignment) {
            updated = true;
            return { ...sec, alignment: desiredAlignment };
          }
          return sec;
        });

        if (updated) {
          await product.update({ pageSections: newSections });
          console.log(`Fixed alignment for ${product.name}`);
        }
      }
    }
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fix();
