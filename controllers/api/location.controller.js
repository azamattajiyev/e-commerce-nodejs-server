const {Location, Document}=require("../../models");
const {paginateData,errorRes,successRes,selecteditem} =require("../common.controller");
const {Op} = require('sequelize');
const NodeCache = require("node-cache");
const myCache = new NodeCache( { stdTTL:1000,} );
// Create and Save a new Location
exports.create =async (req, res) => {
  try{
    const {
      nameTm,
      nameRu,
      parentId,
      active
    } =req.body
    // Validate request
    // console.log(req.body);
    if (
      !nameTm ||
      !nameRu ||
      !parentId
      ) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a Location
    const newLocation = {
      name:JSON.stringify({
        tm:nameTm,
        ru:nameRu
      }),
      parentId,
      active: active ? 1 : 0,
    };
    // Save Brand in the database
    let data = await Location.create(newLocation)
    myCache.del( "myLocation" )
    res.status(200).json(successRes(data,`${data.name} atly location üstünlikli döredildi`));
  } catch (error) {
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Locations from the database.
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
    const data= await Location.findAndCountAll({
      limit:parseInt(limit),
      offset,
      where: condition,
      attributes:['id','name','parentId','active'],
      include:[
        {model: Location,
          as:'parent',
          attributes:['id','name','parentId']
        },
      ]
    })
    res.status(200).json(paginateData(data,limit,page));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Locations."));
  }
};
// Find a single Location with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Location.findByPk(id,
      {
        attributes:['id','name','parentId']
      })
    if (data) {
      data.dataValues.parends=await Location.getAllParents(data.dataValues.parentId)
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Location with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Location with id=" + id));
  }
};
// Update a Location by the id in the request
exports.update =async (req, res) => {
  try{
    const id = req.params.id;
    const {
      nameTm,
      nameRu,
      parentId,
      active
    } =req.body
    // Validate request
    console.log(req.body);
    if (
      !nameTm ||
      !nameRu ||
      !parentId
      ) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a Location
    const newLocation = {
      name:JSON.stringify({
        tm:nameTm,
        ru:nameRu
      }),
      parentId,
      active: active ? 1 : 0,
    };
    let data =await Location.update(newLocation, {
      where: { id:id }
    })
    console.log(data);
    res.status(200).json(successRes(null,"Location was updated successfully."));
  } catch (error) {
    console.log(error.message);
    res.status(200).json(errorRes(error.message));
  }
};
exports.active =async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Location.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      myCache.del( "myLocation" )
      res.status(200).json(successRes(data));

    } else {
      res.status(200).json(errorRes(`Cannot find Category with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Category with id=" + id+" "+error));
  }
};
// Delete a Location with the specified id in the request
exports.delete = async(req, res) => {
  try {
    const id = req.params.id;
    const num=await Location.destroy({
      where: { id: id }
    })
    if (num == 1) {
      myCache.del( 'myLocation' )
      res.status(200).json(successRes(null,"Location was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete Location with id=${id}. Maybe Location was not found!`));
    }
  } catch (error) {
    res.status(200).json(errorRes( "Could not delete Location with id=" + id +" "+error.message));
  }
};

exports.findAllselect2 = async(req, res) => {
  try{
    let result=[]
    let {page,limit,search} = req.body
    console.log(page,limit,search);
    if (myCache.has( "myLocation" )) {
      result=myCache.get( "myLocation" )
      if (search && search.selectedIds) {
        result= selecteditem(result,search.selectedIds)
      }
      return res.status(200).json(successRes(result));
    }
    const tree=async(parentId=null,sub=0)=>{
      const data= await Location.findAndCountAll({
        where:{
          parentId,
          active:true
        },
        attributes:['id','name']
      })
      for (let i = 0; i < data.count; i++) {
        const el = data.rows[i];
          result.push({id:el.id,name:el.name,subcount:sub,selected:false})
          await tree(el.id,sub+1)
      }
    }
    await tree()
    const success = myCache.set('myLocation',result)
    if (search && search.selectedIds) {
      result= selecteditem(result,search.selectedIds)
    }
    res.status(200).json(successRes(result));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Categories."));
  }
};

// Delete all Locations from the database.
exports.deleteAll = (req, res) => {
    Location.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Locations were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Locations."
          });
        });
};
// Find all published Locations
exports.findAllPublished = (req, res) => {
    Location.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Locations."
      });
    });
};
