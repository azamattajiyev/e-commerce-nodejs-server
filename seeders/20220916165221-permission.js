'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('permissions', [
        {
          key:'create_role',
          name:'{"tm":"Rol doretmek","ru":"Создать роль"}'
        },
        {
          key:'edit_role',
          name:'{"tm":"roly redaktirläň","ru":"Изменить роль"}'
        },
        {
          key:'read_role',
          name:'{"tm":"roly oka","ru":"прочитать роль"}'
        },
        {
          key:'delete_role',
          name:'{"tm":"roly poz","ru":"Изменить роль"}'
        },
        {
          key:'create_user',
          name:'{"tm":"Ulanyjy doretmek","ru":"Создать пользователя"}'
        },
        {
          key:'edit_user',
          name:'{"tm":"Ulanyjyny redaktirläň","ru":"Изменить пользователя"}'
        },
        {
          key:'read_user',
          name:'{"tm":"Ulanyjyny oka","ru":"прочитать пользователя"}'
        },
        {
          key:'delete_user',
          name:'{"tm":"Ulanyjyny poz","ru":"Изменить пользователя"}'
        },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('permissions', null, {});
  }
};
