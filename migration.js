const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    console.log('Creating table: users...');
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'USER',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: categories...');
    await queryInterface.createTable('categories', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      parentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: products...');
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      specifications: {
        type: DataTypes.JSON,
      },
      capacity: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.JSON,
      },
      videos: {
        type: DataTypes.JSON,
      },
      brochurePdf: {
        type: DataTypes.STRING,
      },
      features: {
        type: DataTypes.JSON,
      },
      applications: {
        type: DataTypes.JSON,
      },
      metaTitle: {
        type: DataTypes.STRING,
      },
      metaDescription: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: leads...');
    await queryInterface.createTable('leads', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      productInterest: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.TEXT,
      },
      source: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'NEW',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: blog_categories...');
    await queryInterface.createTable('blog_categories', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: blogs...');
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      excerpt: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'blog_categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      metaTitle: {
        type: DataTypes.STRING,
      },
      metaDescription: {
        type: DataTypes.TEXT,
      },
      metaKeywords: {
        type: DataTypes.TEXT,
      },
      ogTitle: {
        type: DataTypes.STRING,
      },
      ogDescription: {
        type: DataTypes.TEXT,
      },
      ogImage: {
        type: DataTypes.STRING,
      },
      twitterTitle: {
        type: DataTypes.STRING,
      },
      twitterDescription: {
        type: DataTypes.TEXT,
      },
      twitterImage: {
        type: DataTypes.STRING,
      },
      headScripts: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: testimonials...');
    await queryInterface.createTable('testimonials', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
      },
      image: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: certificates...');
    await queryInterface.createTable('certificates', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: galleries...');
    await queryInterface.createTable('galleries', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    console.log('Creating table: seo_metadata...');
    await queryInterface.createTable('seo_metadata', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pagePath: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      metaTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metaDescription: {
        type: DataTypes.TEXT,
      },
      metaKeywords: {
        type: DataTypes.STRING,
      },
      ogImage: {
        type: DataTypes.STRING,
      },
      headScripts: {
        type: DataTypes.TEXT,
      },
      footerScripts: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('seo_metadata');
    await queryInterface.dropTable('galleries');
    await queryInterface.dropTable('certificates');
    await queryInterface.dropTable('testimonials');
    await queryInterface.dropTable('blogs');
    await queryInterface.dropTable('blog_categories');
    await queryInterface.dropTable('leads');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('users');
  }
};


// --- Execution Wrapper ---
// This allows you to run `node migration.js` directly in the terminal!
if (require.main === module) {
  const { sequelize } = require('./src/lib/db.ts');
  const queryInterface = sequelize.getQueryInterface();
  
  (async () => {
    try {
      console.log("--- Starting Database Migration ---");
      await module.exports.up(queryInterface);
      console.log("\nSUCCESS: Migration completely successfully! All tables are ready.");
    } catch (err) {
      if (err.message && err.message.includes('already exists')) {
        console.log("\nSUCCESS: Your database is already up to date! (Tables already exist)");
      } else {
        console.error("\nERROR: Migration failed!", err.message);
      }
    } finally {
      process.exit();
    }
  })();
}
