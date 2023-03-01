'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let categories=[
      {
        name:'{"tm":"Sowgatlyk harytlar","ru":"Идеи для подарков"}',
        description: '{"tm":"gok onumler barada ","ru":"gok onumler barada"}',
        parentId: null,
        active: 1,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Parfýumeriýa","ru":"Парфюмерия"}',
        description: '{"tm":"","ru":""}',
        parentId: null,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Smartfonlar we gadjetler","ru":"Смартфоны и гаджеты"}',
        description: '{"tm":"","ru":""}',
        parentId: null,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Aýal gyzlar üçin","ru":"Подарки для женщин"}',
        description: '{"tm":"suwlar barada ","ru":"suwlar barada"}',
        parentId: 1,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Erkekler üçin","ru":"Подарки для мужчин"}',
        description: '{"tm":"gok onumler un dokunler","ru":"gok onumler un dokunler"}',
        parentId: 1,
        active: 1,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Sowgat sertifikatlar","ru":"Подарочный сертификат"}',
        description: '{"tm":"ter miweleler barada","ru":"ter miweleler barada"}',
        parentId: 1,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Erkekler üçin","ru":"Для него"}',
        description: '{"tm":"","ru":""}',
        parentId: 2,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Aýal gyzlar üçin","ru":"Для нее"}',
        description: '{"tm":"","ru":""}',
        parentId: 2,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Akylly sagatlar","ru":"Умные часы"}',
        description: '{"tm":"","ru":""}',
        parentId: 3,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Aksesuarlar","ru":"Аксессуары для телефонов и планшетов"}',
        description: '{"tm":"","ru":""}',
        parentId: 3,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"Mobil telefonlar we planşetler","ru":"Мобильные телефоны и планшеты"}',
        description: '{"tm":"","ru":""}',
        parentId: 3,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"","ru":""}',
        description: '{"tm":"","ru":""}',
        parentId: 1,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"","ru":""}',
        description: '{"tm":"","ru":""}',
        parentId: 1,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"","ru":""}',
        description: '{"tm":"","ru":""}',
        parentId: 1,
        active: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'{"tm":"","ru":""}',
        description: '{"tm":"","ru":""}',
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
