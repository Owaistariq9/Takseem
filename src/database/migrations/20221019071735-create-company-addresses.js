'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('company_addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      formatted_address: {
        type: Sequelize.STRING
      },
      google_address: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL(10,6)
      },
      longitude: {
        type: Sequelize.DECIMAL(10,6)
      },
      city_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id',
          as: 'city_id',
        },
        onDelete: 'SET NULL',
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'companies',
          key: 'id',
          as: 'company_id',
        },
        onDelete: 'CASCADE',
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('company_addresses');
  }
};