'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'notifications',
      'userType',
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'notifications',
      'userType'
    );
  }
};
