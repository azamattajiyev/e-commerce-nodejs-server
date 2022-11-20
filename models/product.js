'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Document,{as: 'documents', foreignKey:'id'});
      this.belongsTo(models.Brand, {as: 'brand',foreignKey:'brandId',});
      this.belongsTo(models.Unit, {as: 'unit',foreignKey:'unitId',});
      this.belongsTo(models.Store, {as: 'store',foreignKey:'storeId',});
      this.belongsTo(models.Category, {as: 'cat',foreignKey:'catId',});
      this.belongsTo(models.Product,{ as: 'parent', foreignKey:'parentId'});
      this.hasMany(models.Product, { as: 'children', foreignKey: 'parentId',useJunctionTable: false  });
      this.belongsToMany(models.Order, {
        through: models.Card,
        as:'orders',
        otherKey: "orderId",
        foreignKey: "productId",
      });
      this.belongsToMany(models.Color, {
        through: models.product_colors,
        as:'colors',
        otherKey: "colorId",
        foreignKey: "productId",
      });
      this.belongsToMany(models.Size, {
        through: models.product_sizes,
        as:'sizes',
        otherKey: "sizeId",
        foreignKey: "productId",
      });
      this.belongsTo(models.Category, {as: 'category',foreignKey:'catId',});
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    priceLast: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    brandId: DataTypes.INTEGER,
    catId: DataTypes.INTEGER,
    unitId: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    barcode: DataTypes.STRING,
    pattern: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};