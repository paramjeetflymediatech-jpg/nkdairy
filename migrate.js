const { Sequelize, DataTypes } = require('sequelize');
const cheerio = require('cheerio');

const sequelize = new Sequelize('nk-dairy', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT('long') },
  pageSections: { type: DataTypes.JSON }
}, { tableName: 'products', timestamps: true });

async function migrate() {
  try {
    await sequelize.authenticate();
    const products = await Product.findAll();
    let updatedCount = 0;

    for (const product of products) {
      if (!product.description) continue;
      
      const $ = cheerio.load(product.description);
      const sections = [];
      let currentSection = { id: '', title: '', content: '', image: '', alignment: 'left', backgroundColor: 'white' };
      let skipMode = false;
      let counter = 1;

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
            currentSection.alignment = sections.length % 2 === 0 ? 'left' : 'right';
            sections.push({ ...currentSection, id: Date.now().toString() + counter++ });
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
        currentSection.alignment = sections.length % 2 === 0 ? 'left' : 'right';
        sections.push({ ...currentSection, id: Date.now().toString() + counter++ });
      }

      const validSections = sections.filter(s => s.content.trim() || s.image);

      if (validSections.length > 0) {
        // Strip the raw HTML from the original description to leave it clean
        // Or we can just leave the original description empty since everything is in sections now
        // Wait, there might be a short intro paragraph before the first heading.
        
        let newDescription = '';
        const firstHeadingIndex = product.description.indexOf('<div class="elementor-widget-heading"');
        if (firstHeadingIndex > 0) {
           // This is risky because Elementor wraps everything.
           // It's safer to clear the description entirely or put a short generated one.
        }

        // Just update pageSections
        await product.update({
          pageSections: validSections,
          description: '' // Clear it out so it doesn't double-render
        });
        updatedCount++;
        console.log(`Migrated ${validSections.length} sections for ${product.name}`);
      }
    }

    console.log(`Successfully migrated ${updatedCount} products.`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
