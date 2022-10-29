'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_colors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      colorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,

      },
      amount: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue:1
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
    await queryInterface.dropTable('product_colors');
  }
};