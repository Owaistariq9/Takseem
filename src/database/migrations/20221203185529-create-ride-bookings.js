'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ride_bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vehicles',
          key: 'id',
          as: 'vehicle_id',
        },
        onDelete: 'CASCADE',
      },
      ac: {
        type: Sequelize.STRING
      },
      smoking: {
        type: Sequelize.STRING
      },
      music: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      monday: {
        type: Sequelize.BOOLEAN
      },
      tuesday: {
        type: Sequelize.BOOLEAN
      },
      wednesday: {
        type: Sequelize.BOOLEAN
      },
      thursday: {
        type: Sequelize.BOOLEAN
      },
      friday: {
        type: Sequelize.BOOLEAN
      },
      saturday: {
        type: Sequelize.BOOLEAN
      },
      sunday: {
        type: Sequelize.BOOLEAN
      },
      start_time: {
        type: Sequelize.INTEGER
      },
      return_time: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL(10,6)
      },
      longitude: {
        type: Sequelize.DECIMAL(10,6)
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      pick_in_km: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ride_bookings');
  }
};