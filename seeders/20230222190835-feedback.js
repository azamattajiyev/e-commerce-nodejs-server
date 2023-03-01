'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let feedbacks=[
      {
        modelName: 'Product',
        modelId: 3,
        userId: 1,
        stars: 3.5,
        comment: 'normalno',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelName: 'Product',
        modelId: 3,
        userId: 2,
        stars: 5,
        comment: 'gowy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelName: 'Product',
        modelId: 3,
        userId: 3,
        stars: 4,
        comment: 'normalno',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('feedbacks',feedbacks , {});
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
