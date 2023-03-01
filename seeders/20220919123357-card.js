'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let cards=[
      {
        userId: 1,
        productId: 3,
        amount: 3,
        price:23.3,
        status:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        productId: 3,
        amount: 3,
        price:26.3,
        status:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        productId: 3,
        amount: 3,
        price:25.3,
        status:0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('cards',cards , {});
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
