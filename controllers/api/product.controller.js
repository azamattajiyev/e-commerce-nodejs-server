const {
  Product,
  Brand,
  Category,
  Unit,
  Store,
  StoreProducts,
  Order,
  Size,
  Color,
  detal,
  Document,
  product_colors,
  product_sizes,
  sequelize,
  Card,
  Like,
  User,
  Address,
  Delivery
}=require("../../models");
const {paginateData,errorRes,successRes,attributes,excludes} =require("../common.controller");
const {Op} = require('sequelize');
// Create and Save a new Product
exports.create =async (req, res) => {
  try{
    const {
      patternId,
      active,
      order,
      price,
      priceLast,
      discount,
      unitId,
      amount,
      barcode,
      colors,
      sizes,
    } =req.body
    // Validate request
    console.log(req.body);
    if (!patternId|| !price|| !order) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    const pattern = await Product.findByPk(patternId)
    if(!pattern){
      res.status(200).json(errorRes(`Cannot find Product with id=${patternId}.`));
    }
    console.log(pattern);
    // Create a Product
    const newProduct = {
      parentId:patternId,
      order,
      active: active ? 1 : 0,
      price,
      priceLast:priceLast ? priceLast : null,
      discount:discount?discount:null,
      unitId:unitId?unitId:null,
      amount:amount?amount:0,
      barcode:barcode?barcode:null,
      pattern:0,
    };
    // Save Product in the database
    let data = await Product.create(newProduct)
    if (data && colors) {
      console.log(colors);
      for (let i = 0; i < colors.length; i++) {
        await product_colors.create({
          productId:data.dataValues.id,
          colorId:colors[i]
        })
      }
    }
    if (data && sizes) {
      for (let i = 0; i < sizes.length; i++) {
        await product_sizes.create({
          productId:data.dataValues.id,
          sizeId:sizes[i]
        })
      }
    }
    res.status(200).json(successRes(data,`${data.name} atly Product üstünlikli döredildi`));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};
exports.createtest =async (req, res) => {
  try{
    const {
      patternId,
      active,
      order,
      price,
      priceLast,
      discount,
      unitId,
      amount,
      barcode,
      colors,
      sizes,
    } =req.body
    // Validate request
    console.log(req.body);
    if (!patternId|| !price|| !order) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    const pattern = await Product.findByPk(patternId)
    if(!pattern){
      res.status(200).json(errorRes(`Cannot find Product with id=${patternId}.`));
    }
    console.log(pattern);
    // Create a Product
    const newProduct = {
      name:pattern.name,
      description:pattern.description,
      parentId:patternId,
      order,
      active: active ? 1 : 0,
      price,
      priceLast:priceLast ? priceLast : null,
      discount:discount?discount:null,
      brandId:pattern.brandId,
      catId:pattern.brandId,
      unitId:unitId?unitId:null,
      amount:amount?amount:0,
      barcode:barcode?barcode:null,
      pattern:0,
    };
    // Save Product in the database
    let data = await Product.create(newProduct)
    if (data && colors) {
      console.log(colors);
      for (let i = 0; i < colors.length; i++) {
        await product_colors.create({
          productId:data.dataValues.id,
          colorId:colors[i]
        })
      }
    }
    if (data && sizes) {
      for (let i = 0; i < sizes.length; i++) {
        await product_sizes.create({
          productId:data.dataValues.id,
          sizeId:sizes[i]
        })
      }
    }
    res.status(200).json(successRes(data,`${data.name} atly Product üstünlikli döredildi`));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};
exports.createPattern =async (req, res) => {
  try{
    const {
      nameTm,
      nameRu,
      descriptionTm,
      descriptionRu,
      active,
      brandId,
      catId,
    } =req.body
    // Validate request
    console.log(req.body);
    if (!nameRu
      || !nameTm
      || !descriptionTm
      || !descriptionRu
      || !brandId
      || !catId
    ) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    // Create a Product
    const newProduct = {
      name:JSON.stringify({
        tm:nameTm,
        ru:nameRu
      }),
      description:JSON.stringify({
        tm:descriptionTm,
        ru:descriptionRu
      }),
      active: active ? 1 : 0,
      brandId,
      catId,
      pattern:1,
    };
    // Save Product in the database
    let data = await Product.create(newProduct)
    if (data && req.body.files) {
      await Document.saveDocuments('Product',data.dataValues.id,req.body.files)
    }
    res.status(200).json(successRes(data,`${data.name} atly Product pattern üstünlikli döredildi`));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};
// Retrieve all Products from the database.
exports.findAll = async(req, res) => {
  try{
    var condition = {
      parentId:{ [Op.ne]: null },
      pattern:false
    }
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
    const offset = page ? ((page-1)*limit) : 0;
    // console.log(offset,limit,condition);
    const data= await Product.findAndCountAll({
      limit,
      offset,
      where: condition,
      subQuery: false,
      distinct: true,
      attributes: attributes.product,
      include:[
        // {
        //   model:Unit,as:'unit',
        // },
        // {
        //   model:Size,as:'sizes',attributes: [
        //     'id','name'
        //   ],
        //   through:{
        //     attributes: [
        //       'amount','active'
        //     ],
        //   }
        // },
        // {
        //   model:Color,as:'colors',attributes: [
        //     'id','name','code'
        //   ],
        //   through:{
        //     attributes: [
        //       'amount','active'
        //     ],
        //   }
        // },
        {model: Product,
          as:'parent',
          attributes: attributes.productPattern,
          include:[
            {
              model:Brand,as:'brand',attributes: {
                exclude: excludes.time
              },
            },
            {
              model:Category,as:'cat',attributes: {
                exclude: excludes.time
              },
            },
            {model: Document, as: 'documents',
              on: {
                modelName: 'Product',
                modelId:{[Op.col]: 'Product.parentId'}
              }
            },
          ]
        },
        // {model: Document, as: 'documents',
        //   on: {
        //     modelName: 'Product',
        //     modelId:{[Op.col]: 'Product.id'}
        //   }
        // },
      ],
    })
    // console.log( await data.rows[0].getColors());
    res.status(200).json(paginateData(
      data,
      limit,
      page));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Products."));
  }
};
exports.findAllTest = async(req, res) => {
  try{
    var condition = {
      parentId:{ [Op.ne]: null },
      pattern:false
    }
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
    const offset = page ? ((page-1)*limit) : 0;
    // console.log(offset,limit,condition);


    try {
      await sequelize.transaction(async (transaction) => {
      const data= await Product.findAndCountAll({
        limit,
        offset,
        where: condition,
        attributes: ['id'],
      }, { transaction })
      let result=[]
      for (let i = 0; i < data.rows.length; i++) {
        result.push(await Product.findOne({
          where:{id:data.rows[i].id,},
          attributes: attributes.product,
          subQuery:false,
          include:[
            {model:Unit,
              as:'unit',
            },
            {model:Size,
              as:'sizes',
              through:{
                attributes: [],
              },
              attributes: [
                'id','name',
                [sequelize.literal('`sizes->product_sizes`.`active`'),'active'],
                [sequelize.literal('`sizes->product_sizes`.`amount`'),'amount'],
              ],
            },
            {model:Store,
              as:'store',
              include:[
                // {
                //   model:Location,
                //   as:'location'
                // },
                {
                  model: Document, as: 'documents',
                  on: {
                    modelName: 'Store',
                    modelId:{[Op.col]: 'Store.id'}
                  }
                },
              ],
              attributes: {
                exclude: ['createdAt','updatedAt','storeId']
              },
            },
            {model:Color,
              as:'colors',attributes: [
                'id','name','code',
                [sequelize.literal('`colors->product_colors`.`active`'),'active'],
                [sequelize.literal('`colors->product_colors`.`amount`'),'amount'],
              ],
              through:{
                attributes: [],
              }
            },
            {model: Product,
              as:'parent',
              attributes: attributes.productPattern,
              include:[
                {
                  model:Brand,as:'brand',attributes: {
                    exclude: excludes.time
                  },
                },
                {
                  model:Category,as:'category',attributes: {
                    exclude: excludes.time
                  },
                },
                {model: Document, as: 'documents',
                  on: {
                    modelName: 'Product',
                    modelId:{[Op.col]: 'Product.parentId'}
                  }
                },
              ]
            },
            // {model: Document, as: 'documents',
            //   on: {
            //     modelName: 'Product',
            //     modelId:{[Op.col]: 'Product.id'}
            //   }
            // },
          ],
        }, { transaction }))
      }
      // await t.commit();
      res.status(200).json(paginateData(
        { count: data.count, rows: result },
        limit,
        page));})
    } catch (error) {
      console.log(error);
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      // await t.rollback();
    
    }
    // console.log( await data.rows[0].getColors());
   
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Products."));
  }
};
exports.findAllPattern = async(req, res) => {
  try{
    var condition = {
      pattern:true,
    }
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
    const data= await Product.findAndCountAll({
      limit:parseInt(limit),
      offset,
      where: condition,
      subQuery: false,
      attributes:  attributes.productPattern2,
      include:[
        // 'stores',
        {model: Product,
          as:'children',
          attributes: attributes.product,
        },
        {
          model:Brand,as:'brand',attributes: {
            exclude: excludes.time
          },
        },
        // {
        //   model:Store,as:'stores',attributes: {
        //     exclude: excludes.time
        //   },
        // },
        {
          model:Category,as:'cat',attributes: {
            exclude: excludes.time
          },
        },
        {model: Document, as: 'documents',
          on: {
            modelName: 'Product',
            modelId:{[Op.col]: 'Product.id'}
          }
        },
      ]
    })
    res.status(200).json(paginateData(data,limit,page));
  } catch (error) {
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Products."));
  }
};
// Find a single Product with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Product.findByPk(id)
    if (data) {
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Product with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Product with id=" + id));
  }
};
// Update a Product by the id in the request
exports.update = async (req, res) => {
  try{
    const id = req.params.id;
    const {
      patternId,
      active,
      order,
      price,
      priceLast,
      discount,
      unitId,
      amount,
      barcode,
      colors,
      sizes,
    } =req.body
    // Validate request
    console.log(req.body);
    if (!patternId|| !price|| !order) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    const pattern = await Product.findByPk(patternId)
    if(!pattern){
      res.status(200).json(errorRes(`Cannot find Product with id=${patternId}.`));
    }
    const newProduct = {
      name:pattern.name,
      description:pattern.description,
      parentId:patternId,
      order,
      active: active ? 1 : 0,
      price,
      priceLast:priceLast ? priceLast : null,
      discount:discount?discount:null,
      brandId:pattern.brandId,
      catId:pattern.brandId,
      unitId:unitId?unitId:null,
      amount:amount?amount:0,
      barcode:barcode?barcode:null,
      pattern:0,
    };
    let data =await Product.update(newProduct, {
      where: { id:id },
    })
    if (data==1) {
      if (colors!=null) {
        await product_colors.clearAllById(id)
        await product_colors.createAll(id,colors)
      }
    if(sizes!=null){
      await product_sizes.clearAllById(id)
      await product_sizes.createAll(id,sizes)
    }
    }
    res.status(200).json(successRes(null,"Product was updated successfully."));
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message));
  }
};
exports.updatePattern = async (req, res) => {
  try{
    const id = req.params.id;
    const {
      nameTm,
      nameRu,
      descriptionTm,
      descriptionRu,
      active,
      brandId,
      catId,
    } =req.body
    // Validate request
    console.log(req.body);
    if (!nameRu
      || !nameTm
      || !descriptionTm
      || !descriptionRu
      || !brandId
      || !catId
    ) {
      res.json(errorRes('Content can not be empty!'));
      return;
    }
    const newProduct = {
      name:JSON.stringify({
        tm:nameTm,
        ru:nameRu
      }),
      description:JSON.stringify({
        tm:descriptionTm,
        ru:descriptionRu
      }),
      active: active ? 1 : 0,
      brandId,
      catId,
      pattern:1,
    };
    let data =await Product.update(newProduct, {
      where: { id:id }
    })
    console.log(data);
    if (data==1) {
      if (req.body.deleted) {
        await Document.clearAllById('Product',id,req.body.deleted)
      }
      if(req.body.files){
        await Document.saveDocuments('Product',id,req.body.files)
      }
    }
    res.status(200).json(successRes(null,"Product was updated successfully."));
  } catch (error) {
    console.log(err.message);
    res.status(200).json(errorRes(error.message));
  }
};
exports.active = async (req, res) => {
  const id = req.params.id;
  try{
    const data = await Product.findByPk(id)
    if (data) {
      data.active=!data.active
      await data.save()
      res.status(200).json(successRes(data));
    } else {
      res.status(200).json(errorRes(`Cannot find Product with id=${id}.`));
    }
  } catch (error) {
    res.status(200).json(errorRes("Error retrieving Product with id=" + id+" "+error));
  }
};
// Delete a Product with the specified id in the request
exports.delete = async(req, res) => {
  try {
    const id = req.params.id;
    const num=await Product.destroy({
      where: { id: id }
    })
    if (num == 1) {
      await Document.clearAll('Product',id)
      res.status(200).json(successRes(null,"Product was deleted successfully!"));
    } else {
      res.status(200).json(errorRes(`Cannot delete Product with id=${id}. Maybe Brand was not found!`));
    }
  } catch (error) {
    res.status(200).json(errorRes( "Could not delete Product with id=" + id +" "+error.message));
  }
};

exports.findAllTest = async(req, res) => {
  try{
    var condition = {
      parentId:{ [Op.ne]: null },
      pattern:false
    }
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
    const offset = page ? ((page-1)*limit) : 0;
    // console.log(offset,limit,condition);


    try {
      await sequelize.transaction(async (transaction) => {
      const data= await Product.findAndCountAll({
        limit,
        offset,
        where: condition,
        attributes: ['id'],
      }, { transaction })
      let result=[]
      for (let i = 0; i < data.rows.length; i++) {
        result.push(await Product.findOne({
          where:{id:data.rows[i].id,},
          attributes: attributes.product,
          subQuery:false,
          include:[
            {model:Unit,
              as:'unit',
            },
            {model:Size,
              as:'sizes',
              through:{
                attributes: [],
              },
              attributes: [
                'id','name',
                [sequelize.literal('`sizes->product_sizes`.`active`'),'active'],
                [sequelize.literal('`sizes->product_sizes`.`amount`'),'amount'],
              ],
            },
            {model:Store,
              as:'store',
              include:[
                // {
                //   model:Location,
                //   as:'location'
                // },
                {
                  model: Document, as: 'documents',
                  on: {
                    modelName: 'Store',
                    modelId:{[Op.col]: 'Store.id'}
                  }
                },
              ],
              attributes: {
                exclude: ['createdAt','updatedAt','storeId']
              },
            },
            {model:Color,
              as:'colors',attributes: [
                'id','name','code',
                [sequelize.literal('`colors->product_colors`.`active`'),'active'],
                [sequelize.literal('`colors->product_colors`.`amount`'),'amount'],
              ],
              through:{
                attributes: [],
              }
            },
            {model: Product,
              as:'parent',
              attributes: attributes.productPattern,
              include:[
                {
                  model:Brand,as:'brand',attributes: {
                    exclude: excludes.time
                  },
                },
                {
                  model:Category,as:'category',attributes: {
                    exclude: excludes.time
                  },
                },
                {model: Document, as: 'documents',
                  on: {
                    modelName: 'Product',
                    modelId:{[Op.col]: 'Product.parentId'}
                  }
                },
              ]
            },
            // {model: Document, as: 'documents',
            //   on: {
            //     modelName: 'Product',
            //     modelId:{[Op.col]: 'Product.id'}
            //   }
            // },
          ],
        }, { transaction }))
      }
      // await t.commit();
      res.status(200).json(paginateData(
        { count: data.count, rows: result },
        limit,
        page));})
    } catch (error) {
      console.log(error);
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      // await t.rollback();
    
    }
    // console.log( await data.rows[0].getColors());
   
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Products."));
  }
};
exports.search = async(req, res) => {
  try{
    var condition = {
      parentId:{ [Op.ne]: null },
      pattern:false
    }
    var parentCondition ={}
    let {page,limit,search} = req.body
    // console.log(page,limit,search);
    if (search) {
      for (const [key, value] of Object.entries(search)) {
        if ( ((key == 'name')||(key == 'description')) && value!='' ) {
          parentCondition[key] = { [Op.like]: `%${value}%` }
        }
      }
    }
    limit=limit ?parseInt(limit):10
    const offset = page ? ((page-1)*limit) : 0;
    console.log(offset,limit,condition, parentCondition);
    try {
      await sequelize.transaction(async (transaction) => {
      const data= await Product.findAndCountAll({
        limit,
        offset,
        where: condition,
        include:[
          {model: Product,
            as:'parent',
            attributes: attributes.productPattern,
            where:parentCondition,
          },
        ],
        attributes: ['id'],
      }, { transaction })
      let result=[]
      for (let i = 0; i < data.rows.length; i++) {
        result.push(await Product.findOne({
          where:{id:data.rows[i].id,},
          attributes: attributes.product,
          subQuery:false,
          include:[
            {model:Unit,
              as:'unit',
            },
            {model:Size,
              as:'sizes',
              through:{
                attributes: [],
              },
              attributes: [
                'id','name',
                [sequelize.literal('`sizes->product_sizes`.`active`'),'active'],
                [sequelize.literal('`sizes->product_sizes`.`amount`'),'amount'],
              ],
            },
            {model:Store,
              as:'store',
              include:[
                // {
                //   model:Location,
                //   as:'location'
                // },
                {
                  model: Document, as: 'documents',
                  on: {
                    modelName: 'Store',
                    modelId:{[Op.col]: 'Store.id'}
                  }
                },
              ],
              attributes: {
                exclude: ['createdAt','updatedAt','storeId']
              },
            },
            {model:Color,
              as:'colors',attributes: [
                'id','name','code',
                [sequelize.literal('`colors->product_colors`.`active`'),'active'],
                [sequelize.literal('`colors->product_colors`.`amount`'),'amount'],
              ],
              through:{
                attributes: [],
              }
            },
            {model: Product,
              as:'parent',
              attributes: attributes.productPattern,
              where:parentCondition,
              include:[
                {
                  model:Brand,as:'brand',attributes: {
                    exclude: excludes.time
                  },
                  include:[
                    {model: Document, as: 'documents',
                      on: {
                        modelName: 'Brand',
                        modelId:{[Op.col]: 'parent.brand.id'}
                      }
                    },
                  ]
                },
                {
                  model:Category,as:'category',attributes: {
                    exclude: excludes.time
                  },
                  include:[
                    {model: Document, as: 'documents',
                      on: {
                        modelName: 'Category',
                        modelId:{[Op.col]: 'Product.parentId'}
                      }
                    },
                  ]
                },
                {model: Document, as: 'documents',
                  on: {
                    modelName: 'Product',
                    modelId:{[Op.col]: 'Product.parentId'}
                  }
                },
              ]
            },
            // {model: Document, as: 'documents',
            //   on: {
            //     modelName: 'Product',
            //     modelId:{[Op.col]: 'Product.id'}
            //   }
            // },
          ],
        }, { transaction }))
      }
      // await t.commit();
      res.status(200).json(paginateData(
        { count: data.count, rows: result },
        limit,
        page));})
    } catch (error) {
      console.log(error);
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      // await t.rollback();
    
    }
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Products."));
  }
};

exports.like = async (req, res) => {
  const id = req.params.id;
  try {
    await sequelize.transaction(async (transaction) => {
      const data = await Product.findByPk(id, { transaction })
      if (data) {
        const [like, created] = await Like.findOrCreate({
          where: {
            userId: req.user.id,
            productId:id,
          },
          defaults: {
            userId: req.user.id,
            productId:id,
          },
          transaction
        },);
        let de=true
        if (!created) {
          await like.destroy({ transaction })
          de=false
        }
        // await transaction.commit();
        res.status(200).json(successRes(de));
      } else {
        res.status(200).json(errorRes(`Cannot find Product with id=${id}.`));
      }
    })
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes("Error retrieving Product with id=" + id+" "+error));
  }
};

exports.getAllProducts = async(req, res) => {
  try{
    console.log(req.body);
    let {page,offset,limit,condition,parentCondition,deliveryCondition,likeCondition,cartCondition}=Product.createConditions(req);
    console.log(page,offset,limit,condition, parentCondition,deliveryCondition,likeCondition,cartCondition);
    await sequelize.transaction(async (transaction) => {
      try {
      const data= await Product.findAndCountAll({
        limit,
        offset,
        where: condition,
        include:[
          {model: Product,
            as:'parent',
            where:parentCondition,
          },
          {model: User,
            as:'likes',
            attributes: {
              exclude: ['password', 'userId', 'refreshToken', 'createdAt', 'updatedAt']
            },
            where:likeCondition.where,
            on:likeCondition.on
          },
          {model: Card,
            as:'card',
            attributes: ['id','amount'],
            where:cartCondition.where,
            on:cartCondition.on
          },
          {model: Store,
            as:'store',
            attributes:['id'],
            include:[
              {model: Delivery,
                as:'deliverys',
                where:deliveryCondition,
              },
            ]
          },
        ],
        attributes: ['id'],
      }, { transaction })
      let result=[]
      
      for (let i = 0; i < data.rows.length; i++) {
        result.push(await Product.findOne({
          where:{id:data.rows[i].id,},
          attributes: attributes.product,
          include:[
            {model:Unit,
              as:'unit',
            },
            {model:Size,
              as:'sizes',
              through:{
                attributes: [],
              },
              attributes: [
                'id','name',
                [sequelize.literal('`sizes->product_sizes`.`active`'),'active'],
                [sequelize.literal('`sizes->product_sizes`.`amount`'),'amount'],
              ],
            },
            {model:Store,
              as:'store',
              include:[
                // {
                //   model:Location,
                //   as:'location'
                // },
                {model: Delivery,
                  as:'deliverys',
                  where:deliveryCondition,
                },
                {model: Address,
                  as:'address',
                },
                {
                  model: Document, as: 'documents',
                  on: {
                    modelName: 'Store',
                    modelId:{[Op.col]: 'Store.id'}
                  }
                },
              ],
              attributes: {
                exclude: ['createdAt','updatedAt','storeId']
              },
            },
            {model:Color,
              as:'colors',attributes: [
                'id','name','code',
                [sequelize.literal('`colors->product_colors`.`active`'),'active'],
                [sequelize.literal('`colors->product_colors`.`amount`'),'amount'],
              ],
              through:{
                attributes: [],
              }
            },
            {model: Product,
              as:'parent',
              attributes: attributes.productPattern,
              where:parentCondition,
              include:[
                {
                  model:Brand,as:'brand',attributes: {
                    exclude: excludes.time
                  },
                  include:[
                    {model: Document, as: 'documents',
                      on: {
                        modelName: 'Brand',
                        modelId:{[Op.col]: 'parent.brand.id'}
                      }
                    },
                  ]
                },
                {
                  model:Category,as:'category',attributes: {
                    exclude: excludes.time
                  },
                  include:[
                    {model: Document, as: 'documents',
                      on: {
                        modelName: 'Category',
                        modelId:{[Op.col]: 'Product.parentId'}
                      }
                    },
                  ]
                },
                {model: Document, as: 'documents',
                  on: {
                    modelName: 'Product',
                    modelId:{[Op.col]: 'Product.parentId'}
                  }
                },
              ]
            },
            {model: User,
              as:'likes',
              attributes: ['id'],
              where:likeCondition.where,
              on:likeCondition.on
            },
            {model: Card,
              as:'card',
              attributes: ['id','amount'],
              where:cartCondition.where,
              on:cartCondition.on
            },
            // {model: Document, as: 'documents',
            //   on: {
            //     modelName: 'Product',
            //     modelId:{[Op.col]: 'Product.id'}
            //   }
            // },
          ],
        }, { transaction }))
      }
      // await transaction.commit();
      res.status(200).json(paginateData(
        { count: data.count, rows: result },
        limit,
        page));
    } catch (error) {
      console.log(error);
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction.rollback();
    }})
  } catch (error) {
    console.log(error);
    res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Products."));
  }
}