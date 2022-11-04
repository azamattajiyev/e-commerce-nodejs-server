const {User, Document,Role}=require("../../models");
const {paginateData,errorRes,successRes, selecteditem,} =require("../common.controller");
const {Op} = require('sequelize');
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
    const data= await User.findAndCountAll({
      limit:parseInt(limit),
      offset,
      where: condition,
      attributes: {
        exclude: ['password', 'userId', 'refreshToken','createdAt','updatedAt']
      },
      include:[
        {model: Role, as: 'role',
          attributes:['id','name']
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'User',
            modelId:{[Op.col]: 'User.id'}
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
    const tree=async(parentId=null,sub=0)=>{
      const data= await User.findAndCountAll({
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
    if (search && search.selectedIds) {
      result= selecteditem(result,search.selectedIds)
    }
    res.status(200).json(successRes(result));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Categories."));
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await User.findByPk(id,{
      attributes: {
        exclude: ['parentId', 'createdAt','updatedAt']
      },
      include:[
        {model: User,
          as:'parent',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: User,
          as:'children',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'User',
            modelId:{[Op.col]: 'User.id'}
          }
        },
      ]
    })
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find User with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving User with id=" + id));
  }
};
// Update a User by the id in the request
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
    const newUser = {
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
    let data =await User.update(newUser, {
      where: { id:id }
    })
    console.log(data);
    if (data==1) {
      if (req.body.deleted) {
        await Document.clearAllById('User',id,req.body.deleted)
      }
      if(req.body.files){
        await Document.saveDocuments('User',id,req.body.files)
      }
    }
    res.status(200).json(successRes(null,"User was updated successfully."));
  } catch (error) {
    console.log(err.message);
    res.status(200).json(errorRes(error.message));
  }
};
exports.active =async (req, res) => {
  const id = req.params.id;
  try{
    const data = await User.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      res.status(200).json(successRes(data));

    } else {
      res.status(200).json(errorRes(`Cannot find User with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving User with id=" + id+" "+error));
  }
};
// Delete a User with the specified id in the request
exports.delete = async(req, res) => {
  try {
    const id = req.params.id;
    const num=await User.destroy({
      where: { id: id }
    })
    if (num == 1) {
      await Document.clearAll('User',id)
      res.status(200).json(successRes(null,"User was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete User with id=${id}. Maybe Brand was not found!`));
    }
  } catch (error) {
    res.status(200).json(errorRes( "Could not delete User with id=" + id +" "+error.message));
  }
};
// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
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

