'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let products=[
      {
        name:'{"tm":"test","ru":"test"}',
        description: '{"tm":"beko","ru":"beko"}',
        parentId: null,
        active: 1,
        order: null,
        price: null,
        priceLast: null,
        discount:null,
        brandId: 1,
        catId: 4,
        rating:3.5,
        amount: null,
        barcode: null,
        pattern: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"beko","ru":"beko"}',
        description: '{"tm":"beko","ru":"beko"}',
        parentId: null,
        active: 1,
        order: null,
        price: null,
        priceLast: null,
        discount:null,
        brandId: 1,
        catId: 4,
        rating:3.5,
        amount: null,
        barcode: null,
        pattern: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        parentId: 1,
        active: 1,
        order: 1,
        price: 5.96,
        priceLast: 6,
        discount:null,
        storeId: 1,
        rating:3.5,
        amount: null,
        unitId:1,
        barcode: 'RDG77SF99',
        pattern: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    await queryInterface.bulkInsert('products',products , {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('products', null, {});
  }
};
