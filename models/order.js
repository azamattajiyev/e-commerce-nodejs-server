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
      this.belongsToMany(models.Card, {
        through: models.cardorder,
        as:'cards',
        otherKey: "cardId",
        foreignKey: "orderId",
      });
      this.hasOne(models.User,{foreignKey: 'userId' })
      this.hasOne(models.Store,{foreignKey: 'storeId' })
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    deliveryId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};