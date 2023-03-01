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
      this.hasMany(models.Delivery,{as: 'deliverys',foreignKey:'id'})
      this.hasMany(models.Feedback,{as: 'feedbacks', foreignKey:'modelId'});
      this.belongsTo(models.Address, {as: 'address',foreignKey:'addressId',});
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
    addressId: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE,
    // delivery_price: DataTypes.DOUBLE,
    // delivery_price_ex: DataTypes.DOUBLE,
    // delivery_free: DataTypes.DOUBLE,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Store',
    tableName: 'stores'
  });
  return Store;
};