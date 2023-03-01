'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let stores=[
      {
        name:'{"tm":"beko","ru":"beko"}',
        phoneNumbers:'93312323331,99334343432',
        email:'beko@store.com',
        addressId:1,
        rating:4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"test","ru":"test"}',
        phoneNumbers:'93345457783331,99334377752',
        email:'test@store.com',
        addressId:2,
        rating:3.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('stores',stores , {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('stores', null, {});
  }
};
