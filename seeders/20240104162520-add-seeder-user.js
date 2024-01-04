'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Users', [
    {
      email: "male1@mail.com",
      password: '123456',
      name: 'male1',
      age:25,
      gender: 'MALE',
      profile: null,
      prefer: 'FEMALE',
      quota: 10,
      premium: false,
      updatedAt: new Date(),
      createdAt: new Date()
    },
    {
      email: "female1@mail.com",
      password: '123456',
      name: 'female1',
      age:25,
      gender: 'FEMALE',
      profile: null,
      prefer: 'MALE',
      quota: 10,
      premium: false,
      updatedAt: new Date(),
      createdAt: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
