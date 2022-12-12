'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('veh_models', [{
      name: 'Cultus',
      make_id: 1,
    },
    {
      name: 'Alto',
      make_id: 1,
    },
    {
      name: 'WagonR',
      make_id: 1,
    }
  
   
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('veh_models', null, {});

  }
};
