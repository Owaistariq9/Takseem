'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('veh_documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vehicles',
          key: 'id',
          as: 'vehicle_id',
        },
        onDelete: 'CASCADE',
      },
      document_name: {
        type: Sequelize.STRING
      },
      document_number: {
        type: Sequelize.STRING
      },
      document_expiry: {
        type: Sequelize.DATE
      },
      document_url: {
        type: Sequelize.STRING
      },
      document_identifier: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('veh_documents');
  }
};