'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'company_location_id',
     {type: Sequelize.INTEGER,
      references: {
        model: 'company_addresses',
        key: 'id',
        as: 'company_location_id',
      },
      onDelete: 'SET NULL',},
     
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'users',
      'company_location_id',
    );
  }
};
