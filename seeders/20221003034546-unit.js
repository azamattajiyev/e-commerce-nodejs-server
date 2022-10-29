'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let units=[
      {
        key:'kg',
        name:'{"tm":"kilogram","ru":"килограм"}',
      },
      {
        key:'l',
        name:'{"tm":"liter","ru":"литер"}',
      },
      {
        key:'m',
        name:'{"tm":"meter","ru":"метер"}',
      },
    ]

    await queryInterface.bulkInsert('units',units , {});
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
