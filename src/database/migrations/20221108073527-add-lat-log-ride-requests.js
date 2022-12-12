'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'ride_requests',
      'latitude',
      Sequelize.Sequelize.DECIMAL(10, 6)
    );
    queryInterface.addColumn(
      'ride_requests',
      'longitude',
      Sequelize.Sequelize.DECIMAL(10, 6)
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'ride_requests',
      'latitude'
    );
    queryInterface.removeColumn(
      'ride_requests',
      'longitude'
    );
  }
};
