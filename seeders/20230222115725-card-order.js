'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let cardorders=[
      {
        cardId: 1,
        orderId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cardId: 2,
        orderId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cardId: 1,
        orderId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cardId: 2,
        orderId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('cardorders',cardorders , {});
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
