'use strict';
const {
  Model
} = require('sequelize');
const {Op} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Document,{as: 'documents', foreignKey:'id'});
      this.hasMany(models.Feedback,{as: 'feedbacks', foreignKey:'modelId'});
      this.belongsTo(models.Brand, {as: 'brand',foreignKey:'brandId',});
      this.belongsTo(models.Unit, {as: 'unit',foreignKey:'unitId',});
      this.belongsTo(models.Store, {as: 'store',foreignKey:'storeId',});
      this.belongsTo(models.Category, {as: 'cat',foreignKey:'catId',});
      this.belongsTo(models.Product,{ as: 'parent', foreignKey:'parentId'});
      this.hasMany(models.Product, { as: 'children', foreignKey: 'parentId',useJunctionTable: false  });
      this.hasOne(models.Card,{as: 'card', foreignKey:'productId'});
      this.belongsToMany(models.User, {
        through: models.Like,
        as:'likes',
        otherKey: "userId",
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
  // const getTrTextSearch=(query)=>{
  //   return { [Op.or]:[
  //     { [Op.like]: `{"tm":"%${query}%","ru":"%"}` },
  //     { [Op.like]: `{"tm":"%","ru":"%${query}%"}` },
  //   ] }
  // }
  Product.createConditions=(req)=>{
    var condition = {
      parentId:{ [Op.ne]: null },
      pattern:false
    }
    var parentCondition ={}
    var deliveryCondition ={}
    var cartCondition={
      on:{
        status:0,
      },
      where:{
        status:0,
      }
    }
    var likeCondition={
      on:{
      },
      where:{
      }
    }
    let {page,limit,search,filter} = req.body
    if (search) {
      if (search.parent) {
        for (const [key, value] of Object.entries(search.parent)) {
          if (key=='name'|| key == 'description'){
            if (value!='' && value!=null) {
              parentCondition[key] = { [Op.or]:[
                { [Op.like]: `{"tm":"%${value}%","ru":"%"}` },
                { [Op.like]: `{"tm":"%","ru":"%${value}%"}` },
              ] }
            }
          }else {
            if (value!='' && value!=null) {
              parentCondition[key] = value
            }
          }
        }
      }
      if (search.child) {
        // for (const [key, value] of Object.entries(search.child)) {
        //   if (value!='null' && value!=null && value!='') {
        //     condition[key] = { [Op.like]: `%${value}%` }
        //   }
        // }
        if(search.child.storeId){
          condition['storeId'] ={ [Op.eq]: search.child.storeId }
        }
        // if(search.child.favorite==true && req.user){
        //   likeCondition['id'] ={ [Op.eq]: req.user.id }
        // }else likeCondition=null

        if (req.user) {
          var eqId={ [Op.eq]: req.user.id }
          if(search.child.favorite==true ){
            likeCondition.where['id'] =eqId
            likeCondition.on=null
          }else {
            likeCondition.where=null
            likeCondition.on['id']=eqId
          }
          if(search.child.cart==true ){
            cartCondition.where['userId'] =eqId
            cartCondition.on=null
          }else {
            cartCondition.where=null
            cartCondition.on['userId'] =eqId
          }
        }else{
          var eqnull={ [Op.eq]: null }
          cartCondition.where=null
          cartCondition.on['userId'] =eqnull
          likeCondition.where=null
          likeCondition.on['id'] =eqnull
        }
      }
    }
      if (filter) {
        if (filter.min && filter.max) {
          condition['price'] = { [Op.between]: [filter.min, filter.max] }
        }else if(filter.min && !filter.max){
          condition['price'] = { [Op.lte]: filter.min }
        }else if(!filter.min && filter.max){
          condition['price'] = { [Op.gte]: filter.max }
        }
        if(filter.discount==true){
          condition['discount'] ={ [Op.not]: null }
        }else if (filter.discount==false) {
          condition['discount'] ={ [Op.is]: null}
        }
        console.log(filter.freeDelivery);
        if(filter.freeDelivery==true){
          deliveryCondition['price'] ={ [Op.eq]: 0 }
        }else if(filter.freeDelivery==false){
          deliveryCondition['price'] ={ [Op.ne]: 0}
        }
        if(filter.rating){
          condition['rating'] ={ [Op.eq]: filter.rating }
        }
      }
    limit=limit ?parseInt(limit):10
    const offset = page ? ((page-1)*limit) : 0;
    return {
      page,offset,limit,condition, parentCondition,deliveryCondition,likeCondition,cartCondition
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
    rating: DataTypes.DOUBLE,
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