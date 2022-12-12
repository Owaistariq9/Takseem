'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('veh_types', [{
      type: 'Car',
      max_seats: 3,
    },
    {
      type: 'Motorcycle',
      max_seats: 1,
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('veh_types', null, {});

  }
};
