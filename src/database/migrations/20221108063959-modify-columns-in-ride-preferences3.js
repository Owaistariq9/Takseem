'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'ride_preferences',
      'ac',
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'ride_preferences',
      'ac',
      Sequelize.BOOLEAN
    );
  }
};
