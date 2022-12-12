'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otp_codes', {

      session_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      user_email: {
        type: Sequelize.STRING
      },
      user_phone: {
        type: Sequelize.STRING
      },
      api_name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      expired_at: {
        type: Sequelize.DATE
      },
      is_verified: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('otp_codes');
  }
};