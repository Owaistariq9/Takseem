'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL(10,6)
      },
      longitude: {
        type: Sequelize.DECIMAL(10,6)
      },
      telephone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      employee_strength: {
        type: Sequelize.STRING
      },
      type_industry: {
        type: Sequelize.STRING
      },
      ntn: {
        type: Sequelize.STRING
      },
      owner_name: {
        type: Sequelize.STRING
      },
      owner_contact: {
        type: Sequelize.STRING
      },
      cp_name: {
        type: Sequelize.STRING
      },
      cp_jd: {
        type: Sequelize.STRING
      },
      cp_number: {
        type: Sequelize.STRING
      },
      cp_email: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      is_verified: {
        type: Sequelize.TINYINT
      },
      is_active: {
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};