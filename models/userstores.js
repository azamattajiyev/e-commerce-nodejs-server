'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStores extends Model {

    static associate(models) {
      // define association here
    }
  }
  UserStores.init({
    userId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserStores',
    tableName: 'user_stores'
  });
  return UserStores;
};