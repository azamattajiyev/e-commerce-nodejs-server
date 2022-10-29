'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_sizes.clearAllById=async(productId)=>{
    let sizes=await product_sizes.findAll({
      where:{
        productId
      }
    })
    for (let i = 0; i < sizes.length; i++) {
      sizes[i].destroy();
    }
  }

  product_sizes.createAll=async(productId,ids)=>{
    console.log(ids);
    for (let i = 0; i < ids.length; i++) {
      await product_sizes.create({
        productId,
        sizeId:ids[i],
      })
    }
  }
  product_sizes.init({
    productId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'product_sizes',
    tableName: 'product_sizes',
  });
  return product_sizes;
};