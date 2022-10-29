'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let categories=[
      {
        name:'{"tm":"gok onumler","ru":"gok onumler"}',
        description: '{"tm":"gok onumler barada ","ru":"gok onumler barada"}',
        parentId: null,
        active: 1,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"suwlar","ru":"suwlar"}',
        description: '{"tm":"suwlar barada ","ru":"suwlar barada"}',
        parentId: null,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"gok onumler un dokunler","ru":"gok onumler un dokunler"}',
        description: '{"tm":"gok onumler un dokunler","ru":"gok onumler un dokunler"}',
        parentId: 1,
        active: 1,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"ter miweleler","ru":"ter miweleler"}',
        description: '{"tm":"ter miweleler barada","ru":"ter miweleler barada"}',
        parentId: 1,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('categories',categories , {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('categories', null, {});
  }
};
