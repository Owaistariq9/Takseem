'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          as: 'user_id',
        },
        onDelete: 'CASCADE',
      },
      model_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'veh_models',
          key: 'id',
          as: 'model_id',
        },
        onDelete: 'CASCADE',
      },
      fuel_type: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING,
        references: {
          model: 'veh_colors',
          key: 'color',
          as: 'color',
        },
        onDelete: 'SET NULL',
      },
      engine: {
        type: Sequelize.INTEGER
      },
      is_active: {
        default: true,
        type: Sequelize.BOOLEAN
      },
      picture: {
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
    await queryInterface.dropTable('vehicles');
  }
};