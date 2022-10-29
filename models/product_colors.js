'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  product_colors.clearAllById=async(productId)=>{
    let colors=await product_colors.findAll({
      where:{
        productId
      }
    })
    for (let i = 0; i < colors.length; i++) {
      colors[i].destroy();
    }
  }

  product_colors.createAll=async(productId,ids)=>{
    console.log(ids);
    for (let i = 0; i < ids.length; i++) {
      await product_colors.create({
        productId,
        colorId:ids[i],
      })
    }
  }
  product_colors.init({
    productId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'product_colors',
    tableName: 'product_colors',
  });
  return product_colors;
};