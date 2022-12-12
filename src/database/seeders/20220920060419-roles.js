'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'Administrator',
      shortcode: 'admin',
    },
    {
      id: 2,
      name: 'Company',
      shortcode: 'company',
    },
    {
      id: 3,
      name: 'User',
      shortcode: 'user',
    }
  ]);

  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete('roles', null, {});
  }
};
