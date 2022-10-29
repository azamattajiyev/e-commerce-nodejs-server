'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let sizes=[
      {
        name:'S',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'M',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'L',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('sizes',sizes , {});
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
