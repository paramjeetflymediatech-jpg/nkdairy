require('dotenv').config({ path: ['.env.local', '.env'] });
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios');
const cheerio = require('cheerio');

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

// Define Product Model
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  slug: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT('long') },
  pageSections: { type: DataTypes.JSON },
  images: { type: DataTypes.JSON }
}, { tableName: 'products', timestamps: true });

const wpSlugs = [
  'paneer-plant',
  'dairy-turnkey-projects',
  'greek-yogurt-plant-in-india',
  'cream-pasteurizer-plant',
  'milk-plant',
  'ghee-plant',
  'dahi-and-lassi-plant',
  'milk-pasteurizer-plant',
  'khoya-mawa-making-machine',
  'butter-churner',
  'curd-making-plant-manufacturer',
  'dairy-plant',
  'milk-chilling-plant',
  'cream-separator',
  'batch-pasteurizer-200ltr-to-2000-ltr',
  'htst-milk-processing-plant'
];

async function syncAll() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    const allDbProducts = await Product.findAll();
    let counter = 1;

    for (const slug of wpSlugs) {
      console.log(`\n[${counter}/${wpSlugs.length}] Processing ${slug}...`);
      counter++;

      try {
        // 1. Fetch from WP
        const { data } = await axios.get(`https://nkdairyequipments.com/wp-json/wp/v2/pages?slug=${slug}`);
        if (!data || data.length === 0) {
          console.log(`❌ Not found on WP: ${slug}`);
          continue;
        }

        const page = data[0];
        const content = page.content.rendered;
        
        // 2. Find in DB
        let dbProduct = allDbProducts.find((p) => p.slug === slug);
        if (!dbProduct) {
          dbProduct = allDbProducts.find((p) => p.slug.replace(/-/g, '') === slug.replace(/-/g, ''));
        }

        if (!dbProduct) {
          console.log(`❌ Not found in local DB: ${slug}`);
          continue;
        }

        // 3. Extract Image for Product Main Image
        let imageUrl = null;
        if (page.yoast_head_json?.og_image && page.yoast_head_json.og_image.length > 0) {
          imageUrl = page.yoast_head_json.og_image[0].url;
        } else {
          const match = content.match(/<img[^>]+src="([^">]+)"/i);
          if (match && match[1]) {
            imageUrl = match[1];
          }
        }

        let localImagePath = dbProduct.images && dbProduct.images.length > 0 ? dbProduct.images[0] : null;
        if (imageUrl && !localImagePath) {
          const ext = imageUrl.split('?')[0].split('.').pop() || 'jpg';
          localImagePath = `/products/${dbProduct.slug}.${ext}`;
        }

        // 4. Parse Elementor HTML to ZigZag JSON formatting
        const $ = cheerio.load(content);
        const sections = [];
        let currentSection = { id: '', title: '', content: '', image: '', alignment: 'left', backgroundColor: 'white' };
        let skipMode = false;
        let sectionCounter = 1;

        $('.elementor-widget').each((i, el) => {
          const $el = $(el);
          
          if ($el.hasClass('elementor-widget-heading')) {
            const headingText = $el.find('.elementor-heading-title').text().trim();
            const ignoreWords = ['CONTACT DETAILS', 'Enquiry Form', 'Equipment Gallery', 'Get in touch', 'Reach Us'];
            
            if (ignoreWords.some(w => headingText.toUpperCase().includes(w.toUpperCase()))) {
              skipMode = true;
              return;
            }
            
            skipMode = false;
            
            if (currentSection.content || currentSection.image || currentSection.title) {
              sections.push({ ...currentSection, id: Date.now().toString() + sectionCounter++ });
              currentSection = { id: '', title: '', content: '', image: '', alignment: 'left', backgroundColor: 'white' };
            }
            currentSection.title = headingText;
            
          } else if ($el.hasClass('elementor-widget-text-editor')) {
            if (skipMode) return;
            const textHtml = $el.find('.elementor-widget-container').html() || '';
            currentSection.content += textHtml;
            
          } else if ($el.hasClass('elementor-widget-image')) {
            if (skipMode) return;
            const src = $el.find('img').attr('src');
            if (src && !currentSection.image) {
              currentSection.image = src;
            }
          }
        });

        if (currentSection.content || currentSection.image || currentSection.title) {
          sections.push({ ...currentSection, id: Date.now().toString() + sectionCounter++ });
        }

        const validSections = sections.filter(s => s.content.trim() || s.image);

        // 5. Fix alignment so it perfectly zig-zags (Left Content, Right Content, etc)
        const alignedSections = validSections.map((sec, idx) => {
          // idx 0 -> Text on left, Image on right (alignment: 'right')
          // idx 1 -> Image on left, Text on right (alignment: 'left')
          return {
            ...sec,
            alignment: idx % 2 === 0 ? 'right' : 'left',
            backgroundColor: idx % 2 === 0 ? 'white' : 'gray'
          };
        });

        // 6. Update Database
        await dbProduct.update({
          description: content,
          images: localImagePath ? [localImagePath] : dbProduct.images,
          pageSections: alignedSections
        });

        console.log(`✅ Successfully synced and formatted: ${dbProduct.name}`);
        if (alignedSections.length > 0) {
          console.log(`   -> Created ${alignedSections.length} zig-zag sections`);
        } else {
          console.log(`   -> No valid elementor sections found (will use raw HTML fallback)`);
        }

      } catch (err) {
        console.log(`❌ Error processing ${slug}: ${err.message}`);
      }
    }

    console.log('\n🎉 ALL DONE! Your live database is now perfectly synced and formatted.');
    process.exit(0);

  } catch (err) {
    console.error('Fatal Error:', err);
    process.exit(1);
  }
}

syncAll();
