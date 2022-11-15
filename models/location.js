'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Location,{ as: 'parent', foreignKey:'parentId'});
      this.hasMany(models.Location, { as: 'children', foreignKey: 'parentId',useJunctionTable: false  });
      this.hasMany(models.Store,{as: 'stores',foreignKey:'id'})
    }
  }
  Location.getAllParents=async(uid)=>{
      let names=[]
      const tree=async(id,)=>{
        if (id == null){
          return
        }
        const data= await Location.findOne({
          where:{
            id,
            active:true
          },
          attributes:['id','name','parentId']
        })
        if (data) {
          names.splice( 0, 0, data)
          await tree(data.parentId)
        }
    }
    await tree(uid)
    return names
  }
  Location.init({
    name: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'locations'
  });
  return Location;
};