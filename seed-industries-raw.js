const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// 1. Load environment variables from .env or .env.local
require('dotenv').config();
if (fs.existsSync('.env.local')) {
  try {
    const envConfig = require('dotenv').parse(fs.readFileSync('.env.local'));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  } catch (e) {
    console.warn("Failed to load .env.local:", e.message);
  }
}

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
    name: 'Fruits & Vegetables',
    slug: 'fruits-vegetables',
    description: 'Advanced engineering systems for fruit juice extraction, pulping, vegetable washing, and sorting lines, designed to maintain peak nutritional value.',
    image: '/segments/fruits.png',
    metaTitle: 'Fruits & Vegetables Processing Plants & Machinery | NK Dairy',
    metaDescription: 'Explore our processing machinery for fruits and vegetables. High-efficiency pulpers, washers, and juice extraction systems.',
    equipmentSolutions: {
      enabled: true,
      title: 'Fruits & Vegetables Solutions',
      subtitle: 'Nutrient-preserving extraction and wash systems',
      generalDescription: 'Our machinery ensures delicate handling and hygienic processing of organic crops and pulp production.',
      tabsHeader: 'Available Lines:',
      tabs: [
        {
          id: 'washing-sorting',
          label: 'Washing & Sorting',
          content: '<p>Bubble washers, spray elevators, and roller sorting conveyors designed to remove contaminants from raw produce gently.</p>'
        },
        {
          id: 'extraction-pulping',
          label: 'Pulping & Extraction',
          content: '<p>High-capacity cold/hot break extraction units and turbo pulpers that separate seeds and skin from juices and puree cleanly.</p>'
        }
      ]
    },
    faqs: [
      {
        id: 'faq-1',
        question: 'Can your pulpers handle stony fruits like mangoes or peaches?',
        answer: 'Yes, our fruit pulping machines are equipped with adjustable screen sizes and specialized paddles designed to cleanly extract pulp from stone fruits without cracking seeds.'
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
  console.log("--- Starting Raw SQL Database Seeding ---");
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'nk-dairy'
  };

  console.log(`Connecting to database '${config.database}' on '${config.host}:${config.port}'...`);
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
  } catch (connErr) {
    console.error("FATAL: Failed to connect to MySQL database:", connErr.message);
    process.exit(1);
  }

  try {
    for (const ind of industriesData) {
      // Find if slug already exists
      const [rows] = await connection.query('SELECT id FROM industries WHERE slug = ?', [ind.slug]);
      if (rows.length > 0) {
        console.log(`Industry with slug '${ind.slug}' already exists. Skipping.`);
        continue;
      }
      
      console.log(`Inserting industry: ${ind.name}...`);
      const insertQuery = `
        INSERT INTO industries (name, slug, description, image, equipmentSolutions, faqs, metaTitle, metaDescription, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      await connection.query(insertQuery, [
        ind.name,
        ind.slug,
        ind.description,
        ind.image,
        JSON.stringify(ind.equipmentSolutions),
        JSON.stringify(ind.faqs),
        ind.metaTitle,
        ind.metaDescription
      ]);
    }
    
    console.log("SUCCESS: Database seeding completed successfully!");
  } catch (err) {
    console.error("ERROR during seeding execution:", err.message);
  } finally {
    await connection.end();
    process.exit(0);
  }
}

seed();
