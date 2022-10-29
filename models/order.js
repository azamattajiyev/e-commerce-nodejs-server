'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: models.Card,
        otherKey: "productId",
        foreignKey: "orderId",
      });
      this.hasOne(models.User,{foreignKey: 'userId' })
      this.hasOne(models.Store,{foreignKey: 'storeId' })
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    tel: DataTypes.STRING,
    description: DataTypes.STRING,
    deliveryId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
    tablename:'orders'
  });
  return Order;
};