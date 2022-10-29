'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let roles=[
      {
        name:'{"tm":"Super Admin","ru":"Супер Админ"}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Alyjy","ru":"Покупатель"}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Satyjy","ru":"Продвесь"}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('roles',roles , {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('roles', null, {});
  }
};
