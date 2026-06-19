'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Create 'industries' table
    await queryInterface.createTable('industries', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipmentSolutions: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      faqs: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      metaTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    // 2. Create 'product_industries' join table
    await queryInterface.createTable('product_industries', {
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      industryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'industries',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    // 3. Add 'model3d' column to 'products' table
    await queryInterface.addColumn('products', 'model3d', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // 1. Remove 'model3d' column from 'products' table
    await queryInterface.removeColumn('products', 'model3d');

    // 2. Drop 'product_industries' table
    await queryInterface.dropTable('product_industries');

    // 3. Drop 'industries' table
    await queryInterface.dropTable('industries');
  }
};
