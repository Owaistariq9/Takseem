'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'ride_requests',
      'status',
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'ride_requests',
      'status'
    );
  }
};
