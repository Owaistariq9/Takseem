'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'companies',
      'address',
    );
    queryInterface.removeColumn(
      'companies',
      'area',
    );
    queryInterface.removeColumn(
      'companies',
      'city',
    );
    queryInterface.removeColumn(
      'companies',
      'latitude',
    );
    queryInterface.removeColumn(
      'companies',
      'longitude',
    );
    

  },

  async down (queryInterface, Sequelize) {

    queryInterface.addColumn(
      'companies',
      'address',
     Sequelize.STRING
    );

    queryInterface.addColumn(
      'companies',
      'area',
     Sequelize.STRING
    );

    queryInterface.addColumn(
      'companies',
      'city',
     Sequelize.STRING
    );

    queryInterface.addColumn(
      'companies',
      'latitude',
      Sequelize.DECIMAL(10,6)
    );
    queryInterface.addColumn(
      'companies',
      'longitude',
      Sequelize.DECIMAL(10,6)
    );

  }
};
