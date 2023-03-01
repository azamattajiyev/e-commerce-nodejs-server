'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {as: 'user',foreignKey:'userId',});
      this.belongsTo(models.Product, {as: 'product',foreignKey:'productId',});
      this.belongsToMany(models.Order, {
        through: models.cardorder,
        as:"orders",
        otherKey: "orderId",
        foreignKey: "cardId",
      });
    }
  }
  Card.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Card',
    tableName: 'cards'
  });
  return Card;
};