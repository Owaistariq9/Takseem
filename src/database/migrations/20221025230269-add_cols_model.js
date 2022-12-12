'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.addColumn(
      'veh_models',
      'engine_class',
      Sequelize.STRING,
    );

    queryInterface.addColumn(
      'veh_models',
      'engine_cc',
      Sequelize.INTEGER,
    );
  },

  async down (queryInterface, Sequelize) {
   queryInterface.removeColumn(
      'veh_models',
      'engine_class',
    );

    queryInterface.removeColumn(
      'veh_models',
      'engine_cc',
    );
  }
};
