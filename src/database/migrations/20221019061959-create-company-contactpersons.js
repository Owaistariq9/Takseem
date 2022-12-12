'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('company_contactpersons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'companies',
          key: 'id',
          as: 'company_id',
        },
        onDelete: 'CASCADE',
      },
      company_role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'company_roles',
          key: 'id',
          as: 'company_role_id',
        },
        onDelete: 'SET NULL',
      },
      designation: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      is_active: {
        default: true,
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
    await queryInterface.dropTable('company_contactpersons');
  }
};