const {Category, Document}=require("../../models");
const {paginateData,errorRes,successRes, selecteditem,} =require("../common.controller");
const {Op} = require('sequelize');
const NodeCache = require("node-cache");
const myCache = new NodeCache( { stdTTL:10000,} );
// Create and Save a new Category
exports.create =async (req, res) => {
  try{
    const {
      nameTm,
      nameRu,
      descriptionTm,
      descriptionRu,
      parentId,
      active,
      order,
    } =req.body
    // Validate request
    console.log(req.body);
    if (!nameRu
      || !nameTm
      || !descriptionTm
      || !descriptionRu
      || !order) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a Category
    const newCategory = {
      name:JSON.stringify({
        tm:nameTm,
        ru:nameRu
      }),
      description:JSON.stringify({
        tm:descriptionTm,
        ru:descriptionRu
      }),
      parentId: parentId ? parentId : null,
      order,
      active: active ? 1 : 0,
    };
    // Save Category in the database
    myCache.del( "myKey" )
    let data = await Category.create(newCategory)
    if (data && req.body.files) {
      await Document.saveDocuments('Category',data.dataValues.id,req.body.files)
    }
    res.status(200).json(successRes(data,`${data.name} atly Category üstünlikli döredildi`));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Categories from the database.
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
    const offset = page ? ((page-1)*limit) : 0;
    // console.log(offset);
    const data= await Category.findAndCountAll({
      limit:parseInt(limit),
      offset,
      where: condition,
      attributes: {
        exclude: ['parentId', 'createdAt','updatedAt']
      },
      include:[
        {model: Category,
          as:'parent',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Category,
          as:'children',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'Category',
            modelId:{[Op.col]: 'Category.id'}
          }
        },
      ]
    })
    res.status(200).json(paginateData(data,limit,page));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Categories."));
  }
};
exports.findAllselect2 = async(req, res) => {
  try{
    let result=[]
    let {page,limit,search} = req.body
    console.log(page,limit,search);
    if (myCache.has( "myKey" )) {
      result=myCache.get( "myKey" )
      if (search && search.selectedIds) {
        result= selecteditem(result,search.selectedIds)
      }
      return res.status(200).json(successRes(result));
    }
    const tree=async(parentId=null,sub=0)=>{
      const data= await Category.findAndCountAll({
        where:{
          parentId,
          active:true
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
    const success = myCache.set('myKey',result)
    if (search && search.selectedIds) {
      result= selecteditem(result,search.selectedIds)
    }
    res.status(200).json(successRes(result));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Categories."));
  }
};

// Find a single Category with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Category.findByPk(id,{
      attributes: {
        exclude: ['parentId', 'createdAt','updatedAt']
      },
      include:[
        {model: Category,
          as:'parent',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Category,
          as:'children',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'Category',
            modelId:{[Op.col]: 'Category.id'}
          }
        },
      ]
    })
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Category with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Category with id=" + id));
  }
};
exports.findSelectOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Category.findByPk(id,{
      attributes: {
        exclude: ['parentId', 'createdAt','updatedAt']
      },
      include:[
        {model: Category,
          as:'parent',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'Category',
            modelId:{[Op.col]: 'Category.id'}
          }
        },
      ]
    })
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Category with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Category with id=" + id));
  }
};
// Update a Category by the id in the request
exports.update =async (req, res) => {
  try{
    const id = req.params.id;
    const {
      nameTm,
      nameRu,
      descriptionTm,
      descriptionRu,
      parentId,
      active,
      order,
    } =req.body
    // Validate request
    console.log(req.body);
    if (
      !nameRu
      || !nameTm
      || !descriptionTm
      || !descriptionRu
      || !order
      ) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    const newCategory = {
      name:JSON.stringify({
        tm:nameTm,
        ru:nameRu
      }),
      description:JSON.stringify({
        tm:descriptionTm,
        ru:descriptionRu
      }),
      parentId: parentId ? parentId : null,
      order,
      active: active ? 1 : 0,
    };
    let data =await Category.update(newCategory, {
      where: { id:id }
    })
    console.log(data);
    if (data==1) {
      if (req.body.deleted) {
        await Document.clearAllById('Category',id,req.body.deleted)
      }
      if(req.body.files){
        await Document.saveDocuments('Category',id,req.body.files)
      }
    }
    myCache.del( "myKey" )
    res.status(200).json(successRes(null,"Category was updated successfully."));
  } catch (error) {
    console.log(err.message);
    res.status(200).json(errorRes(error.message));
  }
};
exports.active =async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Category.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      myCache.del( "myKey" )
      res.status(200).json(successRes(data));

    } else {
      res.status(200).json(errorRes(`Cannot find Category with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Category with id=" + id+" "+error));
  }
};
// Delete a Category with the specified id in the request
exports.delete = async(req, res) => {
  try {
    const id = req.params.id;
    const num=await Category.destroy({
      where: { id: id }
    })
    if (num == 1) {
      await Document.clearAll('Category',id)
      res.status(200).json(successRes(null,"Category was deleted successfully!"));
      myCache.del( "myKey" )
    } else {
      res.status(200).json(errorRes(`Cannot delete Category with id=${id}. Maybe Brand was not found!`));
    }
  } catch (error) {
    res.status(200).json(errorRes( "Could not delete Category with id=" + id +" "+error.message));
  }
};
// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Categories."
          });
        });
};
// Find all published Categories
exports.findAllPublished = async (req, res) => {
  try {
    const data=await Category.findAll({ where: { active: true } })
    res.status(200).json(successRes(data));
  } catch (error) {
    res.status(200).json(errorRes( err.message || "Some error occurred while retrieving Categories."));
  }
};
