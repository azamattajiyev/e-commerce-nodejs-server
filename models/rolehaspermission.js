'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleHasPermission.savePermissions=async(rid, permissions)=>{
    for(const permissionId of permissions) {
      RoleHasPermission.create({
          permissionId,
          roleId:rid
      })
  }
  }
  RoleHasPermission.clearAllById=async(rid)=>{
    await RoleHasPermission.destroy({
      where: {
        roleId:rid
      },
      truncate: false
    })
  }
  RoleHasPermission.init({
    roleId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoleHasPermission',
    tableName: 'role_has_permission'
  });
  return RoleHasPermission;
};