'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Store,{as: 'store',foreignKey:'id'})

    }
  }
  Address.add =async(body,transaction=null)=>{
    const {
      addressName,
      address,
      latitude,
      lingitude,
      locId,
      tel,
      status,
    } =body
    let data = await Address.create({
      name: addressName,
      address,
      tel,
      latitude: latitude??null,
      lingitude: lingitude??null,
      locId,
      status,
      active: 1,
    },{transaction})
    return data.dataValues.id
  }
  Address.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    tel:DataTypes.STRING,
    latitude: DataTypes.STRING,
    lingitude: DataTypes.STRING,
    locId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
  });
  return Address;
};