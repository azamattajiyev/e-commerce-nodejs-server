'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      storeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      tel: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      deliveryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      statusId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};