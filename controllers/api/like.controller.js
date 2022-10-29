const {Like, Document}=require("../../models");
const {paginateData,errorRes,successRes} =require("../common.controller");
const {Op} = require('sequelize');
// Create and Save a new Like
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
    // Create a Like
    const newLike = {
      name:`{"tm":"${nameTm}","ru":"${nameRu}",}`,
      description:`{"tm":"${descriptionTm}","ru":"${descriptionRu}",}`,
      active: active ? 1 : 0,
    };
    // Save Like in the database
    let data = await Like.create(newLike)
    if (data && req.body.files) {
      await Document.saveDocuments('Like',data.dataValues.id,req.body.files)
    } else {

    }
    res.status(200).json(successRes(data,`${data.name} atly Like üstünlikli döredildi`));
  } catch (error) {
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Likes from the database.
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
    const Likes= await Like.findAll({
      where: condition,
      include:[
        {model: Like,
          as:'parent',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        {model: Like,
          as:'children',
          attributes: {
            exclude: [ 'createdAt','updatedAt']
          },
        },
        // {model: Document, as: 'documents',
        //   on: {
        //     modelName: 'Like',
        //     modelId:{[Op.col]: 'Like.id'}
        //   }
        // },
      ]
    })
    res.status(200).json(paginateData(Likes,limit,page));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Likes."));
  }
};
// Find a single Like with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Like.findByPk(id)
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Like with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Like with id=" + id));
  }
};
// Update a Like by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Like.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Like was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Like with id=${id}. Maybe Like was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Like with id=" + id
        });
      });
};
exports.active =async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Like.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Like with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Like with id=" + id+" "+error));
  }
};
// Delete a Like with the specified id in the request
exports.delete =(req, res) => {
  const id = req.params.id;
  Like.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.status(200).json(successRes('',"Like was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete Like with id=${id}. Maybe Like was not found!`));
    }
  })
  .catch(err => {
    res.status(200).json(errorRes( "Could not delete Like with id=" + id));
  });
};


// Delete all Likes from the database.
exports.deleteAll = (req, res) => {
    Like.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Likes were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Likes."
          });
        });
};
// Find all published Likes
exports.findAllPublished = (req, res) => {
    Like.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Likes."
      });
    });
};
