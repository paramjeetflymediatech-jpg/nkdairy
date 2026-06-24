const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
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

// Connect to Database using environment variables
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false
});

// Define Faq Model to match the one in src/models/Faq.ts
const Faq = sequelize.define('Faq', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.STRING, allowNull: false },
  answer: { type: DataTypes.TEXT, allowNull: false },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'faqs', timestamps: true });

const faqData = [
  {
    question: "What types of dairy equipment do you manufacture?",
    answer: "We manufacture a comprehensive range of dairy processing equipment, including Milk Plants, Paneer Plants, Ghee Plants, Cream Pasteurizers, Butter Churners, HTST Milk Processing Plants, and Automated Milking Machines.",
    order: 1,
    isActive: true
  },
  {
    question: "Do you provide turnkey solutions for dairy plants?",
    answer: "Yes, we specialize in complete turnkey projects. From initial conceptualization and plant layout to manufacturing, installation, and commissioning, we handle the entire process to ensure a seamless setup for your dairy business.",
    order: 2,
    isActive: true
  },
  {
    question: "Are your machines customizable?",
    answer: "Absolutely. We understand that every dairy processing requirement is unique. Our engineering team can customize equipment capacities, dimensions, and automation levels to perfectly match your specific production needs.",
    order: 3,
    isActive: true
  },
  {
    question: "What quality standards do your products meet?",
    answer: "NK Dairy Equipments is an ISO 9001:2015 certified company. All our equipment is manufactured using high-grade food-safe stainless steel (SS 304/SS 316) and undergoes rigorous quality testing to ensure durability, hygiene, and peak performance.",
    order: 4,
    isActive: true
  },
  {
    question: "Do you offer installation and after-sales service?",
    answer: "Yes, our commitment extends beyond manufacturing. We provide professional on-site installation, staff training, and comprehensive after-sales support, including spare parts and Annual Maintenance Contracts (AMC) to keep your plant running efficiently.",
    order: 5,
    isActive: true
  }
];

async function seedFaqs() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    console.log('\nSyncing Faq table...');
    await Faq.sync({ alter: true });
    
    console.log('Table synced. Seeding data...');

    let createdCount = 0;
    for (const faq of faqData) {
      // Check if FAQ already exists to avoid duplicates
      const [record, created] = await Faq.findOrCreate({
        where: { question: faq.question },
        defaults: faq
      });
      
      if (created) {
        createdCount++;
        console.log(`✅ Added FAQ: "${faq.question}"`);
      } else {
        console.log(`⏩ Skipped FAQ (already exists): "${faq.question}"`);
      }
    }

    console.log(`\n🎉 Seeding complete! ${createdCount} new FAQs added.`);
    process.exit(0);

  } catch (err) {
    console.error('Fatal Error:', err);
    process.exit(1);
  }
}

seedFaqs();
