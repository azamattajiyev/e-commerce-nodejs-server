const {
  Card,
}=require("../../models");
const {paginateData,errorRes,successRes,attributes,excludes} =require("../common.controller");
const {Op} = require('sequelize');
// Create and Save a new Card
exports.create =async (req, res) => {
  try{
    const  {productId, amount, price } =req.body
    // Validate request
    console.log(req.body);
    if (!productId|| !price|| !amount) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a Card
    const newCard = {
      userId:req.user.id,
      productId,
      price,
      amount,
      status:0
    };
    // Save Card in the database
    let data = await Card.create(newCard)
    res.status(200).json(successRes(data.dataValues.id,`${data.name} atly Card üstünlikli döredildi`));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};

// Update a Card by the id in the request
exports.update = async (req, res) => {
  try{
    const id = req.params.id;
    const {
      productId,
      amount,
      price,
    } =req.body
    // Validate request\
    // console.log(req.body);
    if (!productId|| !price|| !amount) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    const newCard = {
      amount: amount,
      price: price,
    };
    let data =await Card.update(newCard, {
      where: { id:id },
    })
    if(data[0]==1){
      res.status(200).json(successRes(true,"Card was updated successfully."));
    }else{
      res.status(200).json(errorRes(`Cannot find Card with id=${productId}.`));
    }
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};

exports.active = async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Card.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Card with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Card with id=" + id+" "+error));
  }
};
// Delete a Card with the specified id in the request
exports.delete = async(req, res) => {
  try {
    const id = req.params.id;
    const num=await Card.destroy({
      where: { id: id }
    })
    if (num == 1) {
      res.status(200).json(successRes(null,"Card was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete Card with id=${id}. Maybe Brand was not found!`));
    }
  } catch (error) {
    res.status(200).json(errorRes( "Could not delete Card with id=" + id +" "+error.message));
  }
};
