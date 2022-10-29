'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product,{as: 'products',foreignKey:'id'})
    }
  }
  Unit.init({
    name: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Unit',
    tableName:'units'
  });
  return Unit;
};