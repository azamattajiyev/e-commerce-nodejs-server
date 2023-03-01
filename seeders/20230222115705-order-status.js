'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let order_statuses=[
      {
        title:'{"tm":"Order Placed","ru":"Order Placed"}',
        descripton: null,
        iconName: 'empty_box',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'{"tm":"Order Confirmed","ru":"Order Confirmed"}',
        descripton: null,
        iconName: 'checked',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'{"tm":"Order Shipped","ru":"Order Shipped"}',
        descripton: null,
        iconName: 'map',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'{"tm":"Out for Delivery","ru":"Out for Delivery"}',
        descripton: null,
        iconName: 'trusc',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'{"tm":"Order Delivered","ru":"Order Delivered"}',
        descripton: null,
        iconName: 'cart',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('order_statuses',order_statuses , {});
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
