'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // let product_stores=[
    //   {
    //     productId: 1,
    //     storeId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     productId: 2,
    //     storeId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     productId: 3,
    //     storeId: 1,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     productId: 1,
    //     storeId: 2,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     productId: 3,
    //     storeId: 2,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    // ]
    // await queryInterface.bulkInsert('product_stores',product_stores , {});
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
