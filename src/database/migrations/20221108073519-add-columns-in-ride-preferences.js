'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'ride_preferences',
      'smoking',
      Sequelize.STRING
    );
    queryInterface.addColumn(
      'ride_preferences',
      'music',
      Sequelize.STRING
    );
    queryInterface.addColumn(
      'ride_preferences',
      'ac',
      Sequelize.STRING
    );
    queryInterface.addColumn(
      'ride_preferences',
      'createdAt',
      Sequelize.DATE
    );
    queryInterface.addColumn(
      'ride_preferences',
      'updatedAt',
      Sequelize.DATE
    );
    queryInterface.addColumn(
      'ride_preferences',
      'deletedAt',
      Sequelize.DATE
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'ride_preferences',
      'smoking',
    );
    queryInterface.removeColumn(
      'ride_preferences',
      'music',
    );
    queryInterface.removeColumn(
      'ride_preferences',
      'ac',
    );
    queryInterface.removeColumn(
      'ride_preferences',
      'createdAt',
    );
    queryInterface.removeColumn(
      'ride_preferences',
      'updatedAt',
    );
    queryInterface.removeColumn(
      'ride_preferences',
      'deletedAt',
    );
  }
};
