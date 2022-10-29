'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let brands=[
      {
        name:'{"tm":"Adidas","ru":"Adidas"}',
        description: '{"tm":"brand barada","ru":"brand barada"}',
        address: '{"tm":"mir3 55 dom 49 kw","ru":"mir3 55 dom 49 kw"}',
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"puma","ru":"puma"}',
        description: '{"tm":"brand barada","ru":"brand barada"}',
        address: '{"tm":"mir3 55 dom 49 kw","ru":"mir3 55 dom 49 kw"}',
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"redbul","ru":"redbul"}',
        description: '{"tm":"brand barada","ru":"brand barada"}',
        address: '{"tm":"mir3 55 dom 49 kw","ru":"mir3 55 dom 49 kw"}',
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('brands',brands , {});
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
