'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: models.RoleHasPermission,
        otherKey: "roleId",
        foreignKey: "permissionId",
      });
    }
  }
  Permission.init({
    name: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Permission',
    tableName: 'permissions'
  });
  return Permission;
};