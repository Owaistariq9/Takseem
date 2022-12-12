'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'rides',
      'pick_in_km',
      Sequelize.INTEGER,
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'rides',
      'pick_in_km',
    );
  }
};
