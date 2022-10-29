'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let colors=[
      {
        code:'#J87SDI',
        name:'{"tm":"grey","ru":"grey"}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code:'#Jh7SDI',
        name:'{"tm":"red","ru":"red"}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code:'#J87S66',
        name:'{"tm":"black","ru":"black"}',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('colors',colors , {});
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
