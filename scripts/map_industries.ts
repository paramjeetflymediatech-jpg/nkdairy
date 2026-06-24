import { connectDB } from '../src/lib/db';
import { Product, Industry } from '../src/models';

const industryProductSlugs: Record<string, string[]> = {
  'dairy-processing-equipment-manufacturers': [
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
    'batch-pasteurizer-200-ltr-to-2000-ltr',
    'htst-milk-processing-plant'
  ],
  'food': [
    'dahi-and-lassi-plant',
    'khoya-mawa-making-machine',
    'curd-making-plant-manufacturer',
    'batch-pasteurizer-200-ltr-to-2000-ltr'
  ],
  'beverage': [
    'dahi-and-lassi-plant',
    'batch-pasteurizer-200-ltr-to-2000-ltr'
  ],
  'beverages': [
    'dahi-and-lassi-plant',
    'batch-pasteurizer-200-ltr-to-2000-ltr'
  ],
  'cosmetics': [
    'batch-pasteurizer-200-ltr-to-2000-ltr'
  ],
  'allied-industry': [
    'batch-pasteurizer-200-ltr-to-2000-ltr'
  ]
};

async function mapIndustries() {
  await connectDB();
  
  for (const [industrySlug, productSlugs] of Object.entries(industryProductSlugs)) {
    const industry = await Industry.findOne({ where: { slug: industrySlug } });
    if (!industry) {
      console.log(`Industry not found: ${industrySlug}`);
      continue;
    }
    
    // We add them one by one to handle Sequelize associations safely
    const products = await Product.findAll({ where: { slug: productSlugs } });
    if (products.length > 0) {
      // Sequelize provides setProducts or addProducts
      await (industry as any).addProducts(products);
      console.log(`Mapped ${products.length} products to ${industrySlug}`);
    } else {
      console.log(`No products found for ${industrySlug}`);
    }
  }
  
  console.log('Mapping complete.');
  process.exit(0);
}

mapIndustries().catch(console.error);
