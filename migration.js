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

console.log(`Connecting to database '${dbName}' on '${dbHost}:${dbPort}' as user '${dbUser}'...`);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: console.log,
});

// Define Models
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
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'products', key: 'id' },
    onDelete: 'CASCADE'
  },
  industryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'industries', key: 'id' },
    onDelete: 'CASCADE'
  }
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

async function runMigration() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successfully established.');

    console.log('Synchronizing database schema (alter: true)...');
    await sequelize.sync({ alter: true });
    console.log('SUCCESS: Database migration / synchronization completed successfully!');
  } catch (error) {
    console.error('FATAL ERROR running database migration:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

runMigration();
