'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Document,{as: 'documents', foreignKey:'id'});
      this.hasMany(models.Product,{as: 'products',foreignKey:'id'})
      this.hasMany(models.Category, { as: 'children', foreignKey: 'parentId',useJunctionTable: false  });
      this.belongsTo(models.Category,{ as: 'parent', foreignKey:'parentId'});
      this.belongsToMany(models.Store, {
        through: models.store_categories,
        as:'stores',
        otherKey: "storeId",
        foreignKey: "categoryId",
      });
    }
  }
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
    tablename:'categories'
  });
  return Category;
};