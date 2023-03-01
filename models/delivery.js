'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {as: 'store',foreignKey:'storeId',});
    }
  }
  Delivery.init({
    title: DataTypes.STRING,
    descripton: DataTypes.STRING,
    price: DataTypes.STRING,
    storeId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Delivery',
    tableName: 'deliveries',
  });
  return Delivery;
};