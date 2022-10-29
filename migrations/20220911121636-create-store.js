'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phoneNumbers: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
      address: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.INTEGER
      },
      locId: {
        type: Sequelize.INTEGER,
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      lingitude: {
        type: Sequelize.DOUBLE
      },
      rate: {
        type: Sequelize.DOUBLE
      },
      delivery_price: {
        type: Sequelize.DOUBLE
      },
      delivery_price_ex: {
        type: Sequelize.DOUBLE
      },
      delivery_free: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('stores');
  }
};