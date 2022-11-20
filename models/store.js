'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Document,{as: 'documents',foreignKey:'id'});
      this.hasMany(models.Product,{as: 'products',foreignKey:'id'})
      this.belongsTo(models.Location, {as: 'location',foreignKey:'locId',});
      this.belongsToMany(models.Category, {
        through: models.store_categories,
        as:'categories',
        foreignKey: 'storeId',
        otherKey: 'categoryId'
      });
      this.belongsToMany(models.User, {
        through: models.UserStores,
        as:'owners',
        foreignKey: 'storeId',
        otherKey: 'userId'
      });
    }
  }
  Store.init({
    name: DataTypes.STRING,
    phoneNumbers: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    order: DataTypes.INTEGER,
    locId: DataTypes.INTEGER,
    latitude: DataTypes.DOUBLE,
    lingitude: DataTypes.DOUBLE,
    rate: DataTypes.DOUBLE,
    delivery_price: DataTypes.DOUBLE,
    delivery_price_ex: DataTypes.DOUBLE,
    delivery_free: DataTypes.DOUBLE,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Store',
    tableName: 'stores'
  });
  return Store;
};