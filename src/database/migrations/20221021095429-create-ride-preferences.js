'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ride_preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ride_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rides',
          key: 'id',
          as: 'ride_id',
        },
        onDelete: 'CASCADE',
      },
      music: {
        type: Sequelize.BOOLEAN
      },
      smoking: {
        type: Sequelize.BOOLEAN
      },
      ac: {
        type: Sequelize.BOOLEAN
      },
      gender_preference: {
        type: Sequelize.STRING
      },
      seats_available: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ride_preferences');
  }
};