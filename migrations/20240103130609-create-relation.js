'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Relations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      male_user: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      female_user: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      liked_by_m: {
        type: Sequelize.BOOLEAN
      },
      liked_by_f: {
        type: Sequelize.BOOLEAN
      },
      dislike: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Relations');
  }
};