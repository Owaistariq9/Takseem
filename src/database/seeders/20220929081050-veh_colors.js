'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('veh_colors', [{
      color: 'White',
      hex_code: "#FFFFFF",
    },
    {
      color: 'Black',
      hex_code: "#000000",
    },
    {
      color: 'Gray',
      hex_code: "#3C3C3C",
    },
    {
      color: 'Silver',
      hex_code: "#C0C0C0",
    },
    {
      color: 'Golden',
      hex_code: "#FFD700",
    },
    {
      color: 'Blue',
      hex_code: "#0000FF",
    },
    {
      color: 'Red',
      hex_code: "#FF0000",
    },
    {
      color: 'Aqua Blue',
      hex_code: "#ADD8E6",
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('veh_colors', null, {});

  }
};
