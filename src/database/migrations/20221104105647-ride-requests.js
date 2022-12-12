'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ride_requests', {
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
      passenger_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          as: 'passenger_id',
        },
        onDelete: 'CASCADE',
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_pending: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ride_requests');
  }
};
