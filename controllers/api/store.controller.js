const {Store, Document,Category,store_categories,Location,UserStores,Address}=require("../../models");
const {paginateData,errorRes,successRes, selecteditem,} =require("../common.controller");
const {Op} = require('sequelize');
// const NodeCache = require("node-cache");
// const myCache = new NodeCache( { stdTTL:1000,} );
// Create and Save a new Store
exports.create =async (req, res) => { 
  try{
    const {
      nameTm,
      nameRu,
      email,
      active,
      phoneNumbers,
      order,
      categories,
      ownerIds,
      files,
    } =req.body
    req.body.tel=phoneNumbers
    // Validate request
    console.log(req.body);
    if (!nameRu
      || !nameTm
      || !phoneNumbers) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a Store
    const newStore = {
      name:JSON.stringify({
        tm:nameTm,
        ru:nameRu
      }),
      order,
      active: active ? 1 : 0,
      phoneNumbers,
      email:email?email:null,
      addressId:Address.add(req.body),
      rate: '5.0',
    };
    // Save Store in the database
    // myCache.del( "myKey" )
    let data = await Store.create(newStore)
    if (data) {
      if (files) {
        await Document.saveDocuments('Store',data.dataValues.id,files)
      }
      if (ownerIds) {
        await UserStores.saveStores(data.dataValues.id,ownerIds)
      }
      if (categories) {
        await store_categories.saveStores1(data.dataValues.id,categories)
      }
    }
    res.status(200).json(successRes(data,`${data.name} atly store üstünlikli döredildi`));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Stores from the database.
exports.findAll = async(req, res) => {
  try{
    var condition = {}
    let {page,limit,search} = req.body
    // console.log(page,limit,search);
    if (search) {
      for (const [key, value] of Object.entries(search)) {
        if(value!=''){
          condition[key] = { [Op.like]: `%${value}%` }
        }
      }
    }
    limit=limit ?parseInt(limit):10
    console.log(condition);
    const offset = page ? ((page-1)*limit) : 0;
    const data= await Store.findAndCountAll({
      limit,
      offset,
      where: condition,
      attributes: {
        exclude: ['createdAt','updatedAt','storeId']
      },
      include:[
        {
          model:Location,
          as:'location'
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'Store',
            modelId:{[Op.col]: 'Store.id'}
          }
        },
      ]
    })
    res.status(200).json(paginateData(data,limit,page));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Stores."));
  }
};
exports.findAllselect2 = async(req, res) => {
  try{
    let result=[]
    let {page,limit,search} = req.body
    const tree=async(parentId=null,sub=0)=>{
      const data= await Store.findAndCountAll({
        where:{
          parentId
        },
        order: [
          // ['id', 'DESC'],
          ['order', 'ASC'],
        ],
        attributes:['id','name']
      })
      // console.log(data);
      for (let i = 0; i < data.count; i++) {
        const el = data.rows[i];
          result.push({id:el.id,name:el.name,subcount:sub,selected:false})
          await tree(el.id,sub+1)
      }
    }
    await tree()
    // const success = myCache.set('myKey',result)
    result= selecteditem(result,search.selectedIds)
    res.status(200).json(successRes(result));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Stores."));
  }
};

// Find a single Store with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Store.findByPk(id,{
      attributes: {
        exclude: ['parentId', 'createdAt','updatedAt']
      },
      include:[
        {model: Store,
          as:'parent',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Store,
          as:'children',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'Store',
            modelId:{[Op.col]: 'Store.id'}
          }
        },
      ]
    })
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Store with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Store with id=" + id));
  }
};
exports.findSelectOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Store.findByPk(id,{
      attributes: {
        exclude: ['parentId', 'createdAt','updatedAt']
      },
      include:[
        {model: Store,
          as:'parent',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'Store',
            modelId:{[Op.col]: 'Store.id'}
          }
        },
      ]
    })
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Store with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Store with id=" + id));
  }
};
// Update a Store by the id in the request
exports.update =async (req, res) => {
  try{
    const id = req.params.id;
    const {
      nameTm,
      nameRu,
      email,
      active,
      phoneNumbers,
      order,
      categories,
      ownerIds,
      files,
      deleted,
    } =req.body
    // Validate request
    console.log(req.body);
    if (!nameRu
      || !nameTm
      || !phoneNumbers) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    const newStore = {
      name:JSON.stringify({
        tm:nameTm,
        ru:nameRu
      }),
      order,
      active: active ? 1 : 0,
      phoneNumbers,
      email:email?email:null,
      addressId,
      rate: '5.0',
    };
    let data =await Store.update(newStore, {
      where: { id:id }
    })
    console.log(data);
    if (data==1) {
      if (deleted) {
        await Document.clearAllById('Store',id,deleted)
      }
      if(files){
        await Document.saveDocuments('Store',id,files)
      }
      if (ownerIds) {
        await UserStores.clearAllById(id)
        await UserStores.saveStores(id,ownerIds)
      }
      if (categories) {
        await store_categories.clearAllById(id)
        await store_categories.saveStores(id,categories)
      }
    }
    // myCache.del( "myKey" )
    res.status(200).json(successRes(null,"Store was updated successfully."));
  } catch (error) {
    console.log(error.message);
    res.status(200).json(errorRes(error.message));
  }
};
exports.active =async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Store.findByPk(id,{
      attributes:['id','active']
    })
    if (data) {
      data.active=!data.active
      await data.save()
      // myCache.del( "myKey" )
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Store with id=${id}.`));
    }
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes("Error retrieving Store with id=" + id+" "+error));
  }
};
// Delete a Store with the specified id in the request
exports.delete = async(req, res) => {
  try {
    const id = req.params.id;
    const num=await Store.destroy({
      where: { id: id }
    })
    if (num == 1) {
      await Document.clearAll('Store',id)
      res.status(200).json(successRes(null,"Store was deleted successfully!"));
      // myCache.del( "myKey" )
    } else {
      res.status(200).json(errorRes(`Cannot delete Store with id=${id}. Maybe Brand was not found!`));
    }
  } catch (error) {
    res.status(200).json(errorRes( "Could not delete Store with id=" + id +" "+error.message));
  }
};
