const {Order, Document}=require("../../models");
const {paginateData,errorRes,successRes} =require("../common.controller");
const {Op} = require('sequelize');
// Create and Save a new Order
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
    // Create a Order
    const newOrder = {
      name:name,
      description:`{"tm":"${descriptionTm}","ru":"${descriptionRu}",}`,
      address,
      active: active ? 1 : 0,
    };
    // Save Order in the database
    let data = await Order.create(newOrder)
    if (data && req.body.files) {
      await Document.saveDocuments('order',data.dataValues.id,req.body.files)
    } else {

    }
    res.status(200).json(successRes(data,`${data.name} atly Order üstünlikli döredildi`));
  } catch (error) {
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Orders from the database.
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
    const Orders= await Order.findAll({
      where: condition,
      include:[
        {model: Document, as: 'documents',
          on: {
            modelName: 'order',
            modelId:{[Op.col]: 'order.id'}
          }
        },
      ]
    })
    console.log();
    res.status(200).json(paginateData(Orders,limit,page));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Orders."));
  }
};
// Find a single Order with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Order.findByPk(id)
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Order with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Order with id=" + id));
  }
};
// Update a Order by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Order.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Order was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Order with id=" + id
        });
      });
};
exports.active =async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Order.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Order with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Order with id=" + id+" "+error));
  }
};
// Delete a Order with the specified id in the request
exports.delete =(req, res) => {
  const id = req.params.id;
  Order.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.status(200).json(successRes('',"Order was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete Order with id=${id}. Maybe Order was not found!`));
    }
  })
  .catch(err => {
    res.status(200).json(errorRes( "Could not delete Order with id=" + id));
  });
};


// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Orders were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Orders."
          });
        });
};
// Find all published Orders
exports.findAllPublished = (req, res) => {
    Order.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};
