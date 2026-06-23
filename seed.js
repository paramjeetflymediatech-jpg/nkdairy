const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env and .env.local
dotenv.config();
if (fs.existsSync('.env.local')) {
  try {
    const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
    console.log('Loaded configurations from .env.local');
  } catch (e) {
    console.warn('Warning: Failed to load .env.local:', e.message);
  }
}

const dbName = process.env.DB_NAME || 'nk-dairy';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || process.env.DB_PASS || 'root';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

console.log(`Connecting to database '${dbName}' on '${dbHost}:${dbPort}'...`);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false, // Turn off logging queries during massive seeding
});

// Define Models to register them with the sequelize instance
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('ADMIN', 'USER'), defaultValue: 'USER' }
}, { tableName: 'users', timestamps: true });

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true },
  parentId: { type: DataTypes.INTEGER, allowNull: true },
  equipmentSolutions: { type: DataTypes.JSON, allowNull: true }
}, { tableName: 'categories', timestamps: true });

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  heroSubtitle: { type: DataTypes.STRING, allowNull: true },
  specifications: { type: DataTypes.JSON, allowNull: true },
  capacity: { type: DataTypes.STRING, allowNull: true },
  images: { type: DataTypes.JSON, allowNull: true },
  videos: { type: DataTypes.JSON, allowNull: true },
  brochurePdf: { type: DataTypes.STRING, allowNull: true },
  features: { type: DataTypes.JSON, allowNull: true },
  applications: { type: DataTypes.JSON, allowNull: true },
  metaTitle: { type: DataTypes.STRING, allowNull: true },
  metaDescription: { type: DataTypes.TEXT, allowNull: true },
  equipmentSolutions: { type: DataTypes.JSON, allowNull: true },
  pageSections: { type: DataTypes.JSON, allowNull: true },
  faqs: { type: DataTypes.JSON, allowNull: true },
  model3d: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'products', timestamps: true });

const Lead = sequelize.define('Lead', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: true },
  productInterest: { type: DataTypes.STRING, allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: true },
  source: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'LOST'), defaultValue: 'NEW' }
}, { tableName: 'leads', timestamps: true });

const BlogCategory = sequelize.define('BlogCategory', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'blog_categories', timestamps: true });

const Blog = sequelize.define('Blog', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  content: { type: DataTypes.TEXT('long'), allowNull: false },
  excerpt: { type: DataTypes.TEXT, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true },
  categoryId: { type: DataTypes.INTEGER, allowNull: true },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
  metaTitle: { type: DataTypes.STRING, allowNull: true },
  metaDescription: { type: DataTypes.TEXT, allowNull: true },
  metaKeywords: { type: DataTypes.TEXT, allowNull: true },
  ogTitle: { type: DataTypes.STRING, allowNull: true },
  ogDescription: { type: DataTypes.TEXT, allowNull: true },
  ogImage: { type: DataTypes.STRING, allowNull: true },
  twitterTitle: { type: DataTypes.STRING, allowNull: true },
  twitterDescription: { type: DataTypes.TEXT, allowNull: true },
  twitterImage: { type: DataTypes.STRING, allowNull: true },
  headScripts: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'blogs', timestamps: true });

const Testimonial = sequelize.define('Testimonial', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  clientName: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 5 },
  image: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'testimonials', timestamps: true });

const Certificate = sequelize.define('Certificate', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'certificates', timestamps: true });

const Gallery = sequelize.define('Gallery', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: true },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'galleries', timestamps: true });

const SeoMetadata = sequelize.define('SeoMetadata', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  pagePath: { type: DataTypes.STRING, allowNull: false, unique: 'pagePath' },
  metaTitle: { type: DataTypes.STRING, allowNull: false },
  metaDescription: { type: DataTypes.TEXT, allowNull: true },
  metaKeywords: { type: DataTypes.TEXT, allowNull: true },
  ogImage: { type: DataTypes.STRING, allowNull: true },
  headScripts: { type: DataTypes.TEXT, allowNull: true },
  footerScripts: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'seo_metadata', timestamps: true });

const Industry = sequelize.define('Industry', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: 'industrySlug' },
  description: { type: DataTypes.TEXT, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true },
  equipmentSolutions: { type: DataTypes.JSON, allowNull: true },
  faqs: { type: DataTypes.JSON, allowNull: true },
  metaTitle: { type: DataTypes.STRING, allowNull: true },
  metaDescription: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'industries', timestamps: true });

const ProductIndustry = sequelize.define('ProductIndustry', {
  productId: { type: DataTypes.INTEGER, primaryKey: true },
  industryId: { type: DataTypes.INTEGER, primaryKey: true }
}, { tableName: 'product_industries', timestamps: false });

// Relationships
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parentId' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Blog.belongsTo(BlogCategory, { foreignKey: 'categoryId', as: 'category' });
BlogCategory.hasMany(Blog, { foreignKey: 'categoryId', as: 'blogs' });
Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });
Product.belongsToMany(Industry, { through: ProductIndustry, as: 'industries', foreignKey: 'productId', otherKey: 'industryId' });
Industry.belongsToMany(Product, { through: ProductIndustry, as: 'products', foreignKey: 'industryId', otherKey: 'productId' });

const industriesData = [
  {
    name: 'Dairy',
    slug: 'dairy-processing-equipment-manufacturers',
    description: 'NK Dairy Equipments is a leading manufacturer of complete processing plants and machinery covering every stage of the dairy manufacturing process, from reception to pasteurization, curd making, and packaging.',
    image: '/segments/dairy.png',
    metaTitle: 'Dairy Processing Equipment Manufacturers in India | NK Dairy',
    metaDescription: 'NK Dairy Equipments manufactures high-quality dairy processing plants, milk reception equipment, pasteurizers, and bulk milk coolers made from SS 304/316.',
    equipmentSolutions: {
      enabled: true,
      title: 'Our Dairy Solutions',
      subtitle: 'Premium machinery for high-yield dairy processing',
      generalDescription: 'We provide technologically advanced, hygienic, and energy-efficient processing machinery for dairy farms and cooperative plants.',
      tabsHeader: 'Equipment Categories:',
      tabs: [
        {
          id: 'milk-reception',
          label: 'Milk Reception',
          content: '<p>Complete reception line modules including <strong>Milk Weighing Bowls</strong>, dump vats, and milk reception tanks engineered with stainless steel 304/316 for ultimate hygiene.</p>'
        },
        {
          id: 'pasteurization',
          label: 'Pasteurization',
          content: '<p>Automated pasteurization skids with precise temperature logs and energy regenerators designed to eliminate pathogens while preserving milk quality.</p>'
        },
        {
          id: 'storage-cooling',
          label: 'Storage & Cooling',
          content: '<p>High-efficiency <strong>Bulk Milk Coolers (BMC)</strong> and insulated silo tanks with advanced agitators to maintain raw milk at constant low temperatures.</p>'
        }
      ]
    },
    faqs: [
      {
        id: 'faq-1',
        question: 'Which grades of stainless steel do you use for dairy plants?',
        answer: 'We exclusively use SS 304 and food-grade SS 316 stainless steel for all components in direct contact with dairy products to ensure maximum hygiene and corrosion resistance.'
      },
      {
        id: 'faq-2',
        question: 'Do you offer customized layout designs for processing plants?',
        answer: 'Yes, we specialize in custom engineering and turnkey plant solutions tailormade to fit your specific land size, processing capacity, and automation requirements.'
      }
    ]
  },
  {
    name: 'Food',
    slug: 'food',
    description: 'Turnkey machinery systems for prepared foods, sauces, mayonnaise, ready-to-eat meals, and confectioneries using high-efficiency cooking vats and mixers.',
    image: '/segments/food.png',
    metaTitle: 'Industrial Food Processing Equipment & Machinery | NK Dairy',
    metaDescription: 'NK Dairy designs and installs industrial food cooking vats, mixing kettles, and automated preparation systems for food businesses.',
    equipmentSolutions: {
      enabled: true,
      title: 'Food Preparation Equipment',
      subtitle: 'Hygienic processing for prepared food lines',
      generalDescription: 'We build durable, automated preparation machinery for scaling confectioneries, sauces, and baking mixes.',
      tabsHeader: 'Machinery Categories:',
      tabs: [
        {
          id: 'cooking-kettles',
          label: 'Cooking Kettles',
          content: '<p>Steam/thermal-fluid jacked kettles equipped with scrapers, agitators, and tiltable mounts for batch cooking processes.</p>'
        },
        {
          id: 'mixing-systems',
          label: 'Mixing & Blending',
          content: '<p>Hygienic high-shear homogenizers and liquid mixers engineered to deliver uniform viscosity in emulsions, sauces, and batters.</p>'
        }
      ]
    },
    faqs: [
      {
        id: 'faq-1',
        question: 'Do you offer direct steam injection options for cooking kettles?',
        answer: 'Yes, we provide both indirect steam jacket heating and direct steam injection options depending on the preparation parameters of your food recipe.'
      }
    ]
  },
  {
    name: 'Cosmetics',
    slug: 'cosmetics',
    description: 'Precision manufacturing machinery for creams, ointments, lotions, shampoos, and toothpaste, featuring high-shear vacuum emulsifiers.',
    image: '/segments/cosmetics.png',
    metaTitle: 'Cosmetic Manufacturing Equipment & Mixers | NK Dairy',
    metaDescription: 'High-quality cosmetic processing machinery, vacuum emulsifiers, and shampoo mixing vats built to GMP standards.',
    equipmentSolutions: {
      enabled: true,
      title: 'Cosmetic Production Plants',
      subtitle: 'Hygienic vacuum systems for premium emulsions',
      generalDescription: 'Our processing systems comply with cosmetic GMP guidelines to deliver lump-free, aerated creams and gels.',
      tabsHeader: 'Cosmetic Machinery:',
      tabs: [
        {
          id: 'emulsifiers',
          label: 'Vacuum Emulsifying Mixer',
          content: '<p>Fully vacuum-sealed mixing reactors with bottom homogenizers and anchor scrapers to create perfectly smooth cosmetics creams without bubbles.</p>'
        },
        {
          id: 'storage-tanks',
          label: 'Hygienic Storage',
          content: '<p>Polished storage and buffer vessels featuring sanitary clamp connections and customized level gauges for filling machine integrations.</p>'
        }
      ]
    },
    faqs: [
      {
        id: 'faq-1',
        question: 'Are your cosmetic mixers compliant with GMP guidelines?',
        answer: 'Yes, all our cosmetics process vessels are designed with electro-polished sanitary finishes (RA < 0.4 microns) and satisfy cosmetics GMP requirements.'
      }
    ]
  },
  {
    name: 'Beverages',
    slug: 'beverages',
    description: 'Advanced beverage blending vats, carbonators, juice pasteurizers, and CIP systems for soft drinks, syrups, and packaged mineral water.',
    image: '/segments/beverages.png',
    metaTitle: 'Beverage Processing Plants & Mixing Tanks | NK Dairy',
    metaDescription: 'Syrup preparation tanks, juice pasteurizer units, and mineral water processing machines designed for maximum throughput.',
    equipmentSolutions: {
      enabled: true,
      title: 'Beverage Processing Systems',
      subtitle: 'Turnkey syrup blending and filtration lines',
      generalDescription: 'We deliver compact process skid frames that optimize blending accuracy and energy conservation.',
      tabsHeader: 'Beverage Modules:',
      tabs: [
        {
          id: 'syrup-room',
          label: 'Syrup Preparation Room',
          content: '<p>Sugar dissolving vats and syrup storage tanks equipped with high-efficiency sanitary pumps and plate filters.</p>'
        },
        {
          id: 'flash-pasteurizer',
          label: 'Flash Pasteurizers',
          content: '<p>Flow-controlled plate heat exchangers for rapid juice/beverage pasteurization, ensuring minimal thermal damage.</p>'
        }
      ]
    },
    faqs: [
      {
        id: 'faq-1',
        question: 'Do you offer automated syrup blending units?',
        answer: 'Yes, we build PLC-controlled continuous and batch syrup blending skids that integrate flow meters for precise ingredient dosing.'
      }
    ]
  },
  {
    name: 'Allied Industry',
    slug: 'allied-industry',
    description: 'Process equipment for chemical blending, pharmaceuticals, nutraceuticals, and clean room process utilities tailored to custom industrial requirements.',
    image: '/segments/allied.png',
    metaTitle: 'Process Engineering Solutions for Allied Industries | NK Dairy',
    metaDescription: 'Industrial pressure vessels, custom chemical mixing vats, and utility storage tanks manufactured to international standards.',
    equipmentSolutions: {
      enabled: true,
      title: 'Allied Process Engineering',
      subtitle: 'Custom process vessels and skid engineering',
      generalDescription: 'We translate complex engineering demands into reliable stainless steel tanks and pipelines for heavy chemical and utility plants.',
      tabsHeader: 'Available Solutions:',
      tabs: [
        {
          id: 'pressure-vessels',
          label: 'Pressure Vessels',
          content: '<p>ASME-standard utility vessels and jacketed reactors engineered to perform under specific high-pressure limits safely.</p>'
        },
        {
          id: 'utility-piping',
          label: 'Process Piping Skids',
          content: '<p>Pre-fabricated utility valve manifolds, hot water generators, and clean utility pipelines constructed with orbital welding.</p>'
        }
      ]
    },
    faqs: [
      {
        id: 'faq-1',
        question: 'Do you perform radiography and hydrostatic tests on pressure vessels?',
        answer: 'Yes, all custom utility vessels undergo complete radiography checks, dye penetrant tests, and hydrostatic tests as required by construction codes.'
      }
    ]
  }
];

async function seed() {
  console.log("--- Starting Consolidated Database Seeding ---");
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");

    // Disable foreign key checks to make seeding order-independent
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    // 1. Seed Main Data from database-seed-data.json if exists
    const seedFilePath = path.join(__dirname, 'database-seed-data.json');
    if (fs.existsSync(seedFilePath)) {
      console.log(`Reading seed data from '${seedFilePath}'...`);
      const rawData = fs.readFileSync(seedFilePath, 'utf8');
      const data = JSON.parse(rawData);

      for (const modelName of Object.keys(data)) {
        if (data[modelName] && data[modelName].length > 0) {
          if (!sequelize.models[modelName]) {
            console.log(`WARNING: Model '${modelName}' is not defined. Skipping records.`);
            continue;
          }
          console.log(`Seeding ${data[modelName].length} records into ${modelName}...`);
          
          // Bulk create with ignoreDuplicates
          await sequelize.models[modelName].bulkCreate(data[modelName], { ignoreDuplicates: true });
        }
      }
    } else {
      console.log(`Seed data file '${seedFilePath}' not found. Skipping file seed.`);
    }

    // 2. Seed Industry Data
    console.log(`Seeding ${industriesData.length} records into Industry...`);
    for (const ind of industriesData) {
      const existing = await Industry.findOne({ where: { slug: ind.slug } });
      if (existing) {
        console.log(`Industry with slug '${ind.slug}' already exists. Skipping.`);
        continue;
      }
      console.log(`Inserting Industry: ${ind.name}...`);
      await Industry.create({
        name: ind.name,
        slug: ind.slug,
        description: ind.description,
        image: ind.image,
        equipmentSolutions: ind.equipmentSolutions,
        faqs: ind.faqs,
        metaTitle: ind.metaTitle,
        metaDescription: ind.metaDescription
      });
    }

    // Enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log("\nSUCCESS: All data seeded successfully!");
  } catch (err) {
    console.error("\nERROR during database seeding:", err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

seed();
