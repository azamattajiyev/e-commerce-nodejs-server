'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let deliveries=[
      {
        title:'{"tm":"mugut","ru":"Супер 0"}',
        descripton: '{"tm":"mugut dastavka","ru":"Супер 0 dastavka"}',
        price:0.0,
        storeId: 1,
        status:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'{"tm":"mugut","ru":"Супер 0"}',
        descripton: '{"tm":"mugut dastavka","ru":"Супер 0 dastavka"}',
        price:0.0,
        storeId: 2,
        status:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'{"tm":"tiz","ru":"Супер tiz"}',
        descripton: '{"tm":"tiz dastavka","ru":"tiz 0 dastavka"}',
        price:10.0,
        storeId: 1,
        status:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'{"tm":"tiz","ru":"Супер tiz"}',
        descripton: '{"tm":"tiz dastavka","ru":"tiz 0 dastavka"}',
        price:20.0,
        storeId: 2,
        status:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('deliveries',deliveries , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
