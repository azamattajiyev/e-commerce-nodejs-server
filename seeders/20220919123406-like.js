'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let likes=[
      {
        userId: 1,
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ]

    await queryInterface.bulkInsert('likes',likes , {});
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
