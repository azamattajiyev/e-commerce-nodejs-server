'use strict';
const {
  Model
} = require('sequelize');
const db = require('./index')
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {

    static associate(models) {
      this.hasMany(models.Document,{as: 'documents',foreignKey:'id'});
      this.hasMany(models.Product,{as: 'products',foreignKey:'id'})
    }
  }
  Brand.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands'
  });
  return Brand;
};