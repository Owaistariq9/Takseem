'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cities', [{
      name: 'Karachi',
      latitude: 25.1921465,
      longitude: 66.5949827,
    },
    
  ]);
  },

  async down (queryInterface, Sequelize) {
    

    return queryInterface.bulkDelete('cities', null, {});


  }
};
