'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let stores=[
      {
        name:'{"tm":"beko","ru":"beko"}',
        phoneNumbers:'93312323331,99334343432',
        email:'beko@store.com',
        address:'{"tm":"kfldjgk","ru":"kfldjgk"}',
        order:1,
        locId:7,
        latitude:39.07406,
        lingitude:63.58088,
        rate:3.634,
        delivery_price:10,
        delivery_price_ex:30,
        delivery_free: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"test","ru":"test"}',
        phoneNumbers:'93345457783331,99334377752',
        email:'test@store.com',
        address:'{"tm":"testadres","ru":"testadres"}',
        order:2,
        locId:2,
        latitude:39.07499,
        lingitude:63.56788,
        rate:3.634,
        delivery_price:10,
        delivery_price_ex:30,
        delivery_free: 100,
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
