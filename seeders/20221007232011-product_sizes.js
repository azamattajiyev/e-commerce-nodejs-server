'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let product_sizes=[
      {
        productId: 1,
        sizeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        sizeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        sizeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        sizeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        sizeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        sizeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        sizeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    await queryInterface.bulkInsert('product_sizes',product_sizes , {});
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
