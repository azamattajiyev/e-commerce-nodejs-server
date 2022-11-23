'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role_has_permissions', [
      {roleId:1,permissionId:1,createdAt: new Date(),updatedAt: new Date()},
      {roleId:1,permissionId:2,createdAt: new Date(),updatedAt: new Date()},
      {roleId:1,permissionId:3,createdAt: new Date(),updatedAt: new Date()},
      {roleId:1,permissionId:4,createdAt: new Date(),updatedAt: new Date()},
      {roleId:1,permissionId:5,createdAt: new Date(),updatedAt: new Date()},
      {roleId:1,permissionId:6,createdAt: new Date(),updatedAt: new Date()},
      {roleId:1,permissionId:7,createdAt: new Date(),updatedAt: new Date()},
      {roleId:1,permissionId:8,createdAt: new Date(),updatedAt: new Date()},
      {roleId:2,permissionId:5,createdAt: new Date(),updatedAt: new Date()},
      {roleId:2,permissionId:6,createdAt: new Date(),updatedAt: new Date()},
      {roleId:2,permissionId:7,createdAt: new Date(),updatedAt: new Date()},
      {roleId:2,permissionId:8,createdAt: new Date(),updatedAt: new Date()},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('role_has_permissions', null, {});
  }
};
