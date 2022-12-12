'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'companies',
      'is_deleted',
     Sequelize.BOOLEAN
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'companies',
      'is_deleted'    );
  }
};
