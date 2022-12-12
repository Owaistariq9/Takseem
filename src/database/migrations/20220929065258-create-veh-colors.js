'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('veh_colors', {
      color: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      hex_code: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('veh_colors');
  }
};