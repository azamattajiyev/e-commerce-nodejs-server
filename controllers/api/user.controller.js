const {User, Document}=require("../../models");
const {paginateData,errorRes,successRes} =require("../common.controller");
const {Op} = require('sequelize');
// Create and Save a new User
exports.create =async (req, res) => {
  try{
    const {
      name,
      descriptionTm,
      descriptionRu,
      address,
      active
    } =req.body
    // Validate request
    console.log(req.body);
    if (!name || !descriptionTm || !descriptionRu || !address) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a User
    const newUser = {
      name:name,
      description:`{"tm":"${descriptionTm}","ru":"${descriptionRu}",}`,
      address,
      active: active ? 1 : 0,
    };
    // Save User in the database
    let data = await User.create(newUser)
    if (data && req.body.files) {
      await Document.saveDocuments('User',data.dataValues.id,req.body.files)
    } else {

    }
    res.status(200).json(successRes(data,`${data.name} atly User üstünlikli döredildi`));
  } catch (error) {
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Users from the database.
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
    const Users= await User.findAll({
      where: condition,
      include:[
        {model: Document, as: 'documents',
          on: {
            modelName: 'user',
            modelId:{[Op.col]: 'user.id'}
          }
        },
      ]
    })
    console.log();
    res.status(200).json(paginateData(Users,limit,page));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Users."));
  }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await User.findByPk(id)
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
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
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
exports.delete =(req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.status(200).json(successRes('',"User was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete User with id=${id}. Maybe User was not found!`));
    }
  })
  .catch(err => {
    res.status(200).json(errorRes( "Could not delete User with id=" + id));
  });
};


// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Users."
          });
        });
};
// Find all published Users
exports.findAllPublished = (req, res) => {
    User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
