'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'userId',as: 'user'});
      this.belongsTo(models.Store,{foreignKey:'modelId',as: 'store'});
      this.belongsTo(models.Product,{foreignKey:'modelId',as: 'product'});
    }
  }
  Feedback.init({
    modelName: DataTypes.STRING,
    modelId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    stars: DataTypes.DOUBLE,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedbacks',
  });
  return Feedback;
};