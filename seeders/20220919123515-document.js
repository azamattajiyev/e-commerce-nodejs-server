'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let documents=[
      {
        modelName: 'User',
        modelId: 1,
        path: '/User/1.jpeg',
        type: 'image',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelName: 'User',
        modelId: 2,
        path: '/User/2.jpeg',
        type: 'image',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelName: 'User',
        modelId: 3,
        path: '/User/3.jpeg',
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
