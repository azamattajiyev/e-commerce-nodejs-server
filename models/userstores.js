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
  UserStores.saveStores=async(sid, uids)=>{
    for (let j = 0; j < uids.length; j++) {
      await UserStores.create({
        userId: uids[j],
        storeId:sid,
      })
    }
  }
  UserStores.init({
    userId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserStores',
    tableName: 'user_stores'
  });
  return UserStores;
};