'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Document,{as: 'documents', foreignKey:'modelId'});
      this.hasMany(models.Feedback,{as: 'feedbacks', foreignKey:'modelId'});
      this.belongsTo(models.Role, {as: 'role',foreignKey:'roleId',});
      this.belongsToMany(models.Store, {
        through: models.UserStores,
        as:'stores',
        otherKey: "storeId",
        foreignKey: "userId",
      });
      this.belongsToMany(models.Product, {
        through: models.Like,
        as:'likes',
        otherKey: "productId",
        foreignKey: "userId",
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};