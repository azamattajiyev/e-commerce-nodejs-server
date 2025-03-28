'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let orders=[
      {
        userId: 1,
        storeId: 1,
        addressId: 1,
        deliveryId: 1,
        statusId: 2,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        storeId: 2,
        addressId: 2,
        deliveryId: 2,
        statusId: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('orders',orders , {});
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
