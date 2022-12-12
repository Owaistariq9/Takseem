'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.dropTable('veh_models');
    queryInterface.dropTable('veh_makes');

  },

  async down (queryInterface, Sequelize) {
    // queryInterface.dropTable('veh_models');
    // queryInterface.dropTable('veh_makes');
  }
};
