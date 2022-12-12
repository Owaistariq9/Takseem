'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'companies',
      'cp_name',
    );
    queryInterface.removeColumn(
      'companies',
      'cp_jd',
    );
    queryInterface.removeColumn(
      'companies',
      'cp_number',
    );
    queryInterface.removeColumn(
      'companies',
      'cp_email',
    );

  },

  async down (queryInterface, Sequelize) {

    queryInterface.addColumn(
      'companies',
      'cp_name',
     Sequelize.STRING
    );

    queryInterface.addColumn(
      'companies',
      'cp_jd',
     Sequelize.STRING
    );

    queryInterface.addColumn(
      'companies',
      'cp_number',
     Sequelize.STRING
    );

    queryInterface.addColumn(
      'companies',
      'cp_email',
     Sequelize.STRING
    );

  }
};
