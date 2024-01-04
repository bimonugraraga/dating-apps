'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Relations', 'match', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Relations', 'match', null)
  }
};
