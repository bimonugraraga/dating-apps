'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'premium', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn('Users', 'quota', {
      type: DataTypes.INTEGER,
      defaultValue: 10
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'premium', null)
    await queryInterface.renameColumn('Users', 'quota', null)
  }
};
