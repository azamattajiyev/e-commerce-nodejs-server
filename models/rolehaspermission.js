'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_has_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  role_has_permission.savePermissions = async (rid, permissions) => {
    for(const permissionId of permissions) {
      role_has_permission.create({
          permissionId,
          roleId:rid
      })
  }
  }
  role_has_permission.clearAllById = async (rid) => {
    await role_has_permission.destroy({
      where: {
        roleId:rid
      },
      truncate: false
    })
  }
  role_has_permission.init({
    roleId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role_has_permission',
    tableName: 'role_has_permissions'
  });
  return role_has_permission;
};