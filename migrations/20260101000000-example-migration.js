'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example: Create a new table
     * await queryInterface.createTable('NewTableName', {
     *   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
     *   name: { type: Sequelize.STRING },
     *   createdAt: { type: Sequelize.DATE, allowNull: false },
     *   updatedAt: { type: Sequelize.DATE, allowNull: false }
     * });
     *
     * Example: Add a new column to existing table
     * await queryInterface.addColumn('Products', 'new_column_name', {
     *   type: Sequelize.STRING
     * });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example: Drop table
     * await queryInterface.dropTable('NewTableName');
     *
     * Example: Remove column
     * await queryInterface.removeColumn('Products', 'new_column_name');
     */
  }
};
