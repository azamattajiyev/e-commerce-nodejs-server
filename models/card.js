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
    }
  }
  Card.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    amout: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Card',
    tableName: 'cards'
  });
  return Card;
};