'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('veh_makes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'veh_types',
          key: 'id',
          as: 'type_id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('veh_makes');
  }
};