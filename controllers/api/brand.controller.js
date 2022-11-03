const {Brand, Document}=require("../../models");
const {paginateData,errorRes,successRes,selecteditem} =require("../common.controller");
const {Op} = require('sequelize');
const NodeCache = require("node-cache");
const myCache = new NodeCache( { stdTTL:1000,} );
// Create and Save a new Brand
exports.create =async (req, res) => {
  try{
    const {
      name,
      descriptionTm,
      descriptionRu,
      addressTm,
      addressRu,
      active
    } =req.body
    // Validate request
    // console.log(req.body);
    if (
      !name ||
      !descriptionTm ||
      !descriptionRu ||
      !addressTm ||
      !addressRu
      ) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a Brand
    const newBrand = {
      name:JSON.stringify({
        tm:name,
        ru:name
      }),
      description:JSON.stringify({
        tm:descriptionTm,
        ru:descriptionRu
      }),
      address:JSON.stringify({
        tm:addressTm,
        ru:addressRu
      }),
      active: active ? 1 : 0,
    };
    // Save Brand in the database
    let data = await Brand.create(newBrand)
    if (data && req.body.files) {
      await Document.saveDocuments('Brand',data.dataValues.id,req.body.files)
    }
    myCache.del( "BrandSelect" )
    res.status(200).json(successRes(data,`${data.name} atly brand üstünlikli döredildi`));
  } catch (error) {
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Brands from the database.
exports.findAll = async(req, res) => {
  try{
    var condition = {}
    let {page,limit,search} = req.body
    console.log(page,limit,search);
    if (search) {
      for (const [key, value] of Object.entries(search)) {
        if(value!=''){
          condition[key] = { [Op.like]: `%${value}%` }
        }
      }
    }
    const offset = page ? ((page-1)*limit) : 0;
    const data= await Brand.findAndCountAll({
      limit:parseInt(limit),
      offset,
      where: condition,
      include:[
        {model: Document, as: 'documents',
          on: {
            modelName: 'Brand',
            modelId:{[Op.col]: 'Brand.id'}
          }
        },]
    })
    res.status(200).json(paginateData(data,limit,page));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Brands."));
  }
};
// Find a single Brand with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Brand.findByPk(id)
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Brand with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Brand with id=" + id));
  }
};
// Update a Brand by the id in the request
exports.update =async (req, res) => {
  try{
    const id = req.params.id;
    const {
      name,
      descriptionTm,
      descriptionRu,
      addressTm,
      addressRu,
      active
    } =req.body
    // Validate request
    // console.log(req.body);
    console.log(req.body);
    if (
      !name ||
      !descriptionTm ||
      !descriptionRu ||
      !addressTm ||
      !addressRu
      ) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    const newBrand = {
      name:JSON.stringify({
        tm:name,
        ru:name
      }),
      description:JSON.stringify({
        tm:descriptionTm,
        ru:descriptionRu
      }),
      address:JSON.stringify({
        tm:addressTm,
        ru:addressRu
      }),
      active: active ? 1 : 0,
    };
    let data =await Brand.update(newBrand, {
      where: { id }
    })
    if (data==1) {
      if (req.body.deleted) {
        await Document.clearAllById('Brand',id,req.body.deleted)
      }
      if(req.body.files){
        await Document.saveDocuments('Brand',id,req.body.files)
      }
    }
    myCache.del( "BrandSelect" )
    res.status(200).json(successRes(null,"Brand was updated successfully."));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};
exports.active =async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Brand.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      myCache.del( "BrandSelect" )
      res.status(200).json(successRes(data));
    } else {
    myCache.del( "BrandSelect" )
      res.status(200).json(errorRes(`Cannot find Brand with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Brand with id=" + id+" "+error));
  }
};
// Delete a Brand with the specified id in the request
exports.delete = async(req, res) => {
  try {
    const id = req.params.id;
    const num=await Brand.destroy({
      where: { id: id }
    })
    if (num == 1) {
      await Document.clearAll('Brand',id)
      myCache.del( 'BrandSelect' )
      res.status(200).json(successRes(null,"Brand was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete Brand with id=${id}. Maybe Brand was not found!`));
    }
  } catch (error) {
    res.status(200).json(errorRes( "Could not delete Brand with id=" + id +" "+error.message));
  }
};
// Delete all Brands from the database.
exports.deleteAll = (req, res) => {
    Brand.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({ message: `${nums} Brands were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Brands."
      });
    });
};
// Find all published Brands
exports.findAllPublished = async (req, res) => {
  try {
    const id = req.params.id;
    const data=await Brand.findAndCountAll({ where: { active: true } ,limit:5,offset:1})
    res.status(200).json(successRes(data));
  } catch (error) {
    res.status(200).json(errorRes( err.message || "Some error occurred while retrieving Brands."));
  }
};
exports.findAllselect2 = async(req, res) => {
  try{
    let result=[]
    let {page,limit,search} = req.body
    console.log(page,limit,search);
    if (myCache.has( "BrandSelect" )) {
      result=myCache.get( "BrandSelect" )
      if (search && search.selectedIds) {
        result= selecteditem(result,search.selectedIds)
      }
      return res.status(200).json(successRes(result));
    }
    const data= await Brand.findAndCountAll({
      attributes:['id','name']
    })
    for (let i = 0; i < data.count; i++) {
      const el = data.rows[i];
        result.push({id:el.id,name:el.name,subcount:0,selected:false})
    }
    const success = myCache.set('BrandSelect',result)
    if (search && search.selectedIds) {
      result= selecteditem(result,search.selectedIds)
    }
    res.status(200).json(successRes(result));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Categories."));
  }
};
