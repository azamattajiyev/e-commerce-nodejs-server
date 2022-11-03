const {Brand,Category, Document, Product, Unit, User, Size, Color, Store,Location}=require("../../../models");
const {attributes,excludes} =require("../../common.controller");
const {Op} = require('sequelize');

class PageController {
  async index(req, res, next) {
    res.render('pages/admin/dashboard', {
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async login(req, res, next) {
    res.render('pages/auth/login', { title:'Login', layout:'./layouts/empty'})
  }

  async brands(req, res, next) {
    res.render('pages/admin/brands', {
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async brandCreate(req, res, next) {
    res.render('pages/admin/brands/create', {
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async brandEdit(req, res, next) {
      const id = req.params.id;
      const data =await Brand.findOne({
        where:{id},
        include:[
          {model: Document, as: 'documents',
          on: {
            modelName: 'brand',
            modelId:{[Op.col]: 'brand.id'}
          }
        },
        ]
      })
      
      if (data) {
        res.render('pages/admin/brands/edit', {
          data:data,
          layout:'./layouts/admin/admin',
          extractScripts: true
        })
      } else {
        res.render('pages/error/404', {
          message:`Cannot find Brand with id=${id}.`,
        })
      }
  }

  async categories(req, res, next) {
    res.render('pages/admin/categories', {
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async categoryCreate(req, res, next) {
    const data =await Category.findAll({
      where:{parentId:null},
    })
    res.render('pages/admin/categories/create', {
      data:data,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async categoryEdit(req, res, next) {
      const id = req.params.id;
      const categories =await Category.findAll({
        where:{parentId:null},
      })
      const data =await Category.findOne({
        where:{id},
        include:[
          {model: Document, as: 'documents',
          on: {
            modelName: 'category',
            modelId:{[Op.col]: 'category.id'}
          }
        },
        ]
      })
      if (data) {
        res.render('pages/admin/categories/edit', {
          data:data,
          categories:categories,
          layout:'./layouts/admin/admin',
          extractScripts: true
        })
      } else {
        res.render('pages/error/404', {
          message:`Cannot find Category with id=${id}.`,
        })
      }
  }

  async products(req, res, next) {
    res.render('pages/admin/products', {
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async productCreate(req, res, next) {
    const units =await Unit.findAll()
    const sizes =await Size.findAll()
    const colors =await Color.findAll()
    res.render('pages/admin/products/create', {
      units:units,
      colors:colors,
      sizes:sizes,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }
  async productEdit(req, res, next) {
    const id = req.params.id;
    const units =await Unit.findAll()
    const sizes =await Size.findAll()
    const colors =await Color.findAll()
    const data =await Product.findOne({
      where:{id},
      include:[
        {model: Document, as: 'documents',
          on: {
            modelName: 'product',
            modelId:{[Op.col]: 'product.id'}
          }
        },
        {
          model:Size,as:'sizes',attributes: [
            'id','name'
          ],
          through:{
            attributes: [
              'amount','active'
            ],
          }
        },
        {
          model:Color,as:'colors',attributes: [
            'id','name','code'
          ],
          through:{
            attributes: [
              'amount','active'
            ],
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
              model:Category,as:'cat',attributes: {
                exclude: excludes.time
              },
            },
            {model: Document, as: 'documents',
              on: {
                modelName: 'product',
                modelId:{[Op.col]: 'product.parentId'}
              }
            },
          ]
        },
      ]
    })
    console.log(data.sizes);
    if (data) {
      res.render('pages/admin/products/edit', {
        data:data,
        units:units,
        colors:colors,
        sizes:sizes,
        layout:'./layouts/admin/admin',
        extractScripts: true
      })
    } else {
      res.render('pages/error/404', {
        message:`Cannot find Category with id=${id}.`,
      })
    }
  }
  async patterns(req, res, next) {
    res.render('pages/admin/patterns', {
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async patternCreate(req, res, next) {
    // const data =await Product.findAll({
    //   where:{parentId:null},
    // })
    res.render('pages/admin/patterns/create', {
      // data:data,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }
  async patternEdit(req, res, next) {
    const id = req.params.id;
    const data =await Product.findOne({
      where:{id},
      include:[
        {model: Document, as: 'documents',
        on: {
          modelName: 'product',
          modelId:{[Op.col]: 'product.id'}
        }
      },
      ]
    })
    if (data) {
      res.render('pages/admin/patterns/edit', {
        data:data,
        layout:'./layouts/admin/admin',
        extractScripts: true
      })
    } else {
      res.render('pages/error/404', {
        message:`Cannot find Product with id=${id}.`,
      })
    }
  }
  async stores(req, res, next) {
    res.render('pages/admin/stores', {
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async storeCreate(req, res, next) {
    // const data =await Store.
    res.render('pages/admin/stores/create', {
      // data:data,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async storeEdit(req, res, next) {
      const id = req.params.id;
      const data =await Store.findOne({
        where:{id},
        attributes: {
          exclude: ['createdAt','updatedAt','storeId']
        },
        include:[
          {
            model:Category,as:'categories',attributes: [
              'id',
            ],
            through:{
              attributes: [],
            }
          },
          {
            model:User,as:'owners',attributes: [
              'id','name'
            ],
            through:{
              attributes: [],
            }
          },
          // {
          //   model:Location,
          //   as:'location',
          //   attributes:['id']
          // },
          {model: Document, as: 'documents',
          on: {
            modelName: 'Store',
            modelId:{[Op.col]: 'Store.id'}
          }
        },
        ]
      })
      console.log(data.location);
      if (data) {
        res.render('pages/admin/stores/edit', {
          data:data,
          layout:'./layouts/admin/admin',
          extractScripts: true
        })
      } else {
        res.render('pages/error/404', {
          message:`Cannot find Category with id=${id}.`,
        })
      }
  }
}

module.exports = new PageController()
