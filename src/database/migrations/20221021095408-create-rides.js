'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rides', {
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
      status_change_at: {
        type: Sequelize.DATE
      },
      ride_type: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('rides');
  }
};