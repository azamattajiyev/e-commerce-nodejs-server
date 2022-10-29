'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let product_colors=[
      {
        productId: 1,
        colorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        colorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        colorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        colorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        colorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        colorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        colorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    await queryInterface.bulkInsert('product_colors',product_colors , {});
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
