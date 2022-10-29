'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let locations=[
      {
        name:'{"tm":"Turkmenistan","ru":"Turkmenistan"}',
        parentId: null,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Ashgabat","ru":"Ashgabat"}',
        parentId: 1,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Ahal","ru":"Ahal"}',
        parentId: 1,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Balkan","ru":"Balkan"}',
        parentId: 1,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Dashoguz","ru":"Dashoguz"}',
        parentId: null,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Lebap","ru":"Lebap"}',
        parentId: 1,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Turkmenabat","ru":"Turkmenabat"}',
        parentId: 6,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Anew","ru":"Anew"}',
        parentId: 3,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('locations',locations , {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('locations', null, {});
  }
};
