'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'ride_requests',
      'is_pending',
    );
    queryInterface.removeColumn(
      'ride_requests',
      'is_approved',
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'ride_requests',
      'smoking',
      Sequelize.BOOLEAN
    );
    queryInterface.addColumn(
      'ride_requests',
      'music'
    );
  }
};
