'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('veh_models', {
      model: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      make: {
        type: Sequelize.STRING,
        references: {
          model: 'veh_makes',
          key: 'make',
          as: 'make',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
        
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('veh_models');
  }
};