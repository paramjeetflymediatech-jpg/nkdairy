require('dotenv').config({ path: ['.env.local', '.env'] });
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios');

// Connect to Database using environment variables
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

// Define SeoMetadata Model
const SeoMetadata = sequelize.define('SeoMetadata', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pagePath: { type: DataTypes.STRING, allowNull: false, unique: true },
  metaTitle: { type: DataTypes.STRING, allowNull: false },
  metaDescription: { type: DataTypes.TEXT },
  ogImage: { type: DataTypes.STRING }
}, { tableName: 'seo_metadata', timestamps: true });

const slugs = [
  "home",
  "paneer-plant",
  "dairy-turnkey-projects",
  "greek-yogurt-plant-in-india",
  "cream-pasteurizer-plant",
  "milk-plant",
  "ghee-plant",
  "dahi-and-lassi-plant",
  "milk-pasteurizer-plant",
  "khoya-mawa-making-machine",
  "butter-churner",
  "curd-making-plant-manufacturer",
  "dairy-plant",
  "milk-chilling-plant",
  "cream-separator",
  "batch-pasteurizer-200ltr-to-2000-ltr",
  "htst-milk-processing-plant"
];

async function syncSeo() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    // Ensure table exists in case it wasn't migrated
    await SeoMetadata.sync();
    console.log('Database connected successfully!\n');

    for (const slug of slugs) {
      try {
        console.log(`Fetching SEO for ${slug}...`);
        const url = `https://nkdairyequipments.com/wp-json/wp/v2/pages?slug=${slug}`;
        const { data } = await axios.get(url);

        if (!data.length) {
          console.log(`❌ Not found on WP: ${slug}`);
          continue;
        }

        const page = data[0];

        const seoTitle = page.yoast_head_json?.title || page.rank_math_title || page.title?.rendered || "";
        const seoDescription = page.yoast_head_json?.description || page.rank_math_description || "";
        const ogImage = page.yoast_head_json?.og_image?.[0]?.url || "";

        // Determine correct page path
        const pagePath = slug === "home" ? "/" : `/products/${slug}`;

        // Upsert into SeoMetadata table
        const [record, created] = await SeoMetadata.findOrCreate({
          where: { pagePath },
          defaults: {
            metaTitle: seoTitle,
            metaDescription: seoDescription,
            ogImage: ogImage
          }
        });

        if (!created) {
          await record.update({
            metaTitle: seoTitle,
            metaDescription: seoDescription,
            ogImage: ogImage
          });
        }

        console.log(`✅ Saved SEO for ${pagePath}`);
      } catch (err) {
        console.error(`❌ Error fetching ${slug}:`, err.message);
      }
    }

    console.log('\n🎉 ALL DONE! SEO Metadata has been synced successfully.');
    process.exit(0);

  } catch (err) {
    console.error('Fatal Error:', err);
    process.exit(1);
  }
}

syncSeo();
