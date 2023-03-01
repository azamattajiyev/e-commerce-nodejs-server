'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  async up (queryInterface, Sequelize) {
    let users=[
      {
        name: "Aman",
        username: '62579053',
        email: 'aman@admin.com',
        password: await bcrypt.hash('12345678', 10),
        refreshToken: null,
        active: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Merdan",
        username: '61234567',
        email: 'merdan@satyjy.com',
        password: await bcrypt.hash('12345678', 10),
        refreshToken: null,
        active: 1,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mekan",
        username: '61111111',
        email: 'mekan@alyjy.com',
        password: await bcrypt.hash('12345678', 10),
        refreshToken: null,
        active: 1,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('users',users , {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('users', null, {});
  }
};
