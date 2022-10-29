const {Location, Document}=require("../../models");
const {paginateData,errorRes,successRes} =require("../common.controller");
const {Op} = require('sequelize');
// Create and Save a new Location
exports.create =async (req, res) => {
  try{
    const {
      nameTm,
      nameRu,
      parandId,
      active
    } =req.body
    // Validate request
    console.log(req.body);
    if (!nameTm || !nameRu || !parandId || !active) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a Location
    const newLocation = {
      name:`{"tm":"${nameTm}","ru":"${nameRu}",}`,
      description:`{"tm":"${descriptionTm}","ru":"${descriptionRu}",}`,
      active: active ? 1 : 0,
    };
    // Save Location in the database
    let data = await Location.create(newLocation)
    if (data && req.body.files) {
      await Document.saveDocuments('location',data.dataValues.id,req.body.files)
    } else {

    }
    res.status(200).json(successRes(data,`${data.name} atly Location üstünlikli döredildi`));
  } catch (error) {
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Locations from the database.
exports.findAll = async(req, res) => {
  try{
    var condition = {}
    let {page,limit,search} = req.body
    console.log(page,limit,search);
    if (search) {
      for (const [key, value] of Object.entries(search)) {
        condition[key] = { [Op.like]: `%${value}%` }
      }
    }
    const locations= await Location.findAll({
      where: condition,
      include:[
        {model: Location,
          as:'parent',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Location,
          as:'children',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        // {model: Document, as: 'documents',
        //   on: {
        //     modelName: 'location',
        //     modelId:{[Op.col]: 'location.id'}
        //   }
        // },
      ]
    })
    res.status(200).json(paginateData(locations,limit,page));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Locations."));
  }
};
// Find a single Location with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Location.findByPk(id)
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Location with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Location with id=" + id));
  }
};
// Update a Location by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Location.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Location with id=" + id
        });
      });
};
exports.active =async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Location.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Location with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Location with id=" + id+" "+error));
  }
};
// Delete a Location with the specified id in the request
exports.delete =(req, res) => {
  const id = req.params.id;
  Location.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.status(200).json(successRes('',"Location was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete Location with id=${id}. Maybe Location was not found!`));
    }
  })
  .catch(err => {
    res.status(200).json(errorRes( "Could not delete Location with id=" + id));
  });
};

exports.findAllselect2 = async(req, res) => {
  try{
    let result=[]
    let {page,limit,search} = req.body
    console.log(page,limit,search);
    if (myCache.has( "myKey" )) {
      result=myCache.get( "myKey" )
      result= selecteditem(result,search.selectedIds)
      return res.status(200).json(successRes(result));
    }
    const tree=async(parentId=null,sub=0)=>{
      const data= await Location.findAndCountAll({
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
    const success = myCache.set('myKey',result)
    result= selecteditem(result,search.selectedIds)
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
