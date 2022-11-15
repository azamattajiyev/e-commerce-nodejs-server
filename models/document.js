'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');
const Jimp = require('jimp');
const fs =require('fs-extra');
const db = require("../models");
const path = require('path');

module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    static associate(models) {
      this.belongsTo(models.Brand,{as: 'brand',foreignKey:'modelId',});
      this.belongsTo(models.User,{foreignKey:'modelId',as: 'user'});
      this.belongsTo(models.Category,{foreignKey:'modelId',as: 'category'});
      this.belongsTo(models.Store,{foreignKey:'modelId',as: 'store'});
    }

    async getImage(width,height){

        let dirname=path.join( 'public')+'/uploads/cache/'+this.path;
        if (!fs.existsSync(dirname)) {
          console.log('Found file');
          await imageResize(
              path.join( 'public')+'/uploads/'+path,
              imgWPath,
              width,
              70,
              height,)
        }
    }


    async imageResize(imgRPath, imgWPath, width,  quality,height = Jimp.AUTO,) {
        const image = await Jimp.read(imgRPath);
        image.resize(width, height);
        image.quality(quality);
        await image.writeAsync(imgWPath);
    }

    async test(mess){
        console.log(mess);
    }
    async deletefile(){
      try {
        var dirname=path.join( 'public')+'/uploads/'+this.path;
        if (fs.existsSync(dirname)) {
          fs.unlinkSync(dirname);
        }
        this.destroy()
        return true
      } catch (error) {
        return false
      }
    }
  }
  Document.clearAll=async(modelName,modelId)=>{
    let data = await Document.findAll({
      where:{
        modelName,
        modelId
      }
    })
    data.forEach(el => {
      el.deletefile()
    });
  }
  Document.clearOne=async(modelName,modelId,id)=>{
    let data = await Document.findOne({
      where:{
        modelName,
        modelId,
        id
      }
    })
    if (data) {
      data.deletefile()
    }
  }
  Document.clearAllById=async(modelName,modelId,ids)=>{
    for (let i = 0; i < ids.length; i++) {
      Document.clearOne(modelName,modelId,ids[i])
    }
  }

  Document.saveDocuments=async(modelName,modelId, base64array)=>{
    let data=await Document.findAll({
      where:{
        modelName,modelId,
      },
      attributes:['order'],
      raw:true
    })
    let lastOrder=0
    for (let j = 0; j < data.length; j++) {
      if (data[j].order >lastOrder){
        lastOrder=data[j].order
      }
    }
    base64array.forEach(async (base64) => {
      lastOrder++
        await Document.saveDocument(modelName,modelId, base64, lastOrder)
    });
  }
  Document.filesave=async(modelName,base64)=>{
    var name = crypto.createHash('md5').update(''+Date.now()).digest('hex');
    var ext=base64.split(';')[0].split('/')[1];
    var dirname=path.join( 'public')+'/uploads/'+modelName;
    var filename=name+'.'+ext
    var type=base64.substring("data:".length, base64.indexOf("/"))
    let base64Image = base64.split(';base64,').pop();
    var realFile=Buffer.from(base64Image,'base64');
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
    }
    fs.writeFileSync(dirname+'/'+filename, realFile);
    // await jimp(bigPath,smallPath,256,70)
    return {
        path:'/'+modelName+'/'+filename,
        type
    }
  }

  Document.saveDocument =async(modelName,modelId, base64,order)=>{
    let obj = await Document.filesave(modelName,base64)
    let data = await Document.create({
        modelName,
        modelId,
        path:obj.path,
        type:obj.type,
        order
    })
    if (data) {
        return true
    }
    return false
  }

  Document.init({
    modelName: DataTypes.STRING,
    modelId: DataTypes.INTEGER,
    path: DataTypes.STRING,
    type: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Document',
    tableName: 'documents'
  });
  return Document;
};