'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let store_categories=[
      {
        storeId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeId: 1,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeId: 2,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeId: 2,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    await queryInterface.bulkInsert('store_categories',store_categories , {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('store_categories', null, {});
  }
};
