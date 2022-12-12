'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('veh_makes', [{
      name: 'Suzuki',
    },
    {
      name: 'Honda',
    },
    {
      name: 'Hyundai',
    },
    {
      name: 'Changan',
    },
    {
      name: 'Kia',
    },
    {
      name: 'Cherry',
    },
    {
      name: 'Road Prince',
    },
   
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('veh_makes', null, {});

  }
};
