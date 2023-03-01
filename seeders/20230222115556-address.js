'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let addresses=[
      {
        name:'Ahmet',
        address:'ah ag mir 12',
        tel:'6334251',
        latitude: null,
        lingitude: null,
        locId: 2,
        status: 0,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Atash',
        address:'ah ag mir 132',
        tel:'6334276',
        latitude: null,
        lingitude: null,
        locId: 2,
        status: 0,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Sahra',
        address:'Mr mr 12',
        tel:'6334345',
        latitude: null,
        lingitude: null,
        locId: 2,
        status: 0,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('addresses',addresses , {});
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
