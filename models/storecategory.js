'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StoreCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StoreCategory.saveStores1=async(sid, cids)=>{
    for (let j = 0; j < cids.length; j++) {
      await StoreCategory.create({
        categoryId: cids[j],
        storeId:sid,
      })
    }
  }
  StoreCategory.init({
    storeId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'store_categories',
    tableName:'store_categories'
  });
  return StoreCategory;
};