'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('company_roles', [{
      name: 'Procurement',
      description: '',
      is_active: true
    },
    {
      name: 'HR',
      description: '',
      is_active: true
    },
    {
      name: 'Finance',
      description: '',
      is_active: true
    }
    ,
    {
      name: 'Billing',
      description: '',
      is_active: true
    },
    {
      name: 'Marketing',
      description: '',
      is_active: true
    }
  
   
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('company_roles', null, {});

  }
};
