'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let documents=[
      {
        modelName: 'User',
        modelId: 1,
        path: 'user/1.jpeg',
        type: 'image',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelName: 'User',
        modelId: 2,
        path: 'user/2.jpeg',
        type: 'image',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelName: 'User',
        modelId: 2,
        path: 'user/2.jpeg',
        type: 'image',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    await queryInterface.bulkInsert('documents', documents, {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('documents', null, {});
  }
};
