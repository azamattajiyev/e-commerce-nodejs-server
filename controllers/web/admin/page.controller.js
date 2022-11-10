const {Brand,Category, Document, Product, Unit, User, Size, Color, Store,Location,Role,Permission}=require("../../../models");
const {attributes,excludes} =require("../../common.controller");
const {Op} = require('sequelize');

class PageController {
  async index(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/dashboard', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async login(req, res, next) {
    res.render('pages/auth/login', { title:'Login', layout:'./layouts/empty'})
  }

  async brands(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/brands', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async brandCreate(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/brands/create', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async brandEdit(req, res, next) {
    const lang = req.params.lang;
    const id = req.params.id;
    const data =await Brand.findOne({
      where:{id},
      include:[
        {model: Document, as: 'documents',
        on: {
          modelName: 'Brand',
          modelId:{[Op.col]: 'Brand.id'}
        }
      },
      ]
    })
    console.log(lang,id);
    if (data) {
      console.log(data);
      return res.render('pages/admin/brands/edit', {
        lang,
        data,
        layout:'./layouts/admin/admin',
        extractScripts: true
      })

    } else {
      return res.render('pages/error/404', {
        lang,
        message:`Cannot find Brand with id=${id}.`,
      })
    }
  }

  async categories(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/categories', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async categoryCreate(req, res, next) {
    const lang = req.params.lang;
    const data =await Category.findAll({
      where:{parentId:null},
    })
    res.render('pages/admin/categories/create', {
      data,
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async categoryEdit(req, res, next) {
    const lang = req.params.lang;
    const id = req.params.id;
      const categories =await Category.findAll({
        where:{parentId:null},
      })
      const data =await Category.findOne({
        where:{id},
        include:[
          {model: Document, as: 'documents',
          on: {
            modelName: 'Category',
            modelId:{[Op.col]: 'Category.id'}
          }
        },
        ]
      })
      if (data) {
        res.render('pages/admin/categories/edit', {
          data,
          lang,
          categories:categories,
          layout:'./layouts/admin/admin',
          extractScripts: true
        })
      } else {
        res.render('pages/error/404', {
          lang,
          message:`Cannot find Category with id=${id}.`,
        })
      }
  }

  async products(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/products', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async productCreate(req, res, next) {
    const lang = req.params.lang;
    const units =await Unit.findAll()
    const sizes =await Size.findAll()
    const colors =await Color.findAll()
    res.render('pages/admin/products/create', {
      lang,
      units:units,
      colors:colors,
      sizes:sizes,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }
  async productEdit(req, res, next) {
    const lang = req.params.lang;
    const id = req.params.id;
    const units =await Unit.findAll()
    const sizes =await Size.findAll()
    const colors =await Color.findAll()
    const data =await Product.findOne({
      where:{id},
      include:[
        {model: Document, as: 'documents',
          on: {
            modelName: 'Product',
            modelId:{[Op.col]: 'Product.id'}
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
                modelName: 'Product',
                modelId:{[Op.col]: 'Product.parentId'}
              }
            },
          ]
        },
      ]
    })
    console.log(data.sizes);
    if (data) {
      res.render('pages/admin/products/edit', {
        lang,
        data,
        units:units,
        colors:colors,
        sizes:sizes,
        layout:'./layouts/admin/admin',
        extractScripts: true
      })
    } else {
      res.render('pages/error/404', {
        lang,
        message:`Cannot find Category with id=${id}.`,
      })
    }
  }
  async patterns(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/patterns', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async patternCreate(req, res, next) {
    // const data =await Product.findAll({
    //   where:{parentId:null},
    // })
    const lang = req.params.lang;
    res.render('pages/admin/patterns/create', {
      // data,
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }
  async patternEdit(req, res, next) {
    const lang = req.params.lang;
    const id = req.params.id;
    const data =await Product.findOne({
      where:{id},
      include:[
        {model: Document, as: 'documents',
        on: {
          modelName: 'Product',
          modelId:{[Op.col]: 'Product.id'}
        }
      },
      ]
    })
    if (data) {
      res.render('pages/admin/patterns/edit', {
        lang,
        data,
        layout:'./layouts/admin/admin',
        extractScripts: true
      })
    } else {
      res.render('pages/error/404', {
        lang,
        message:`Cannot find Product with id=${id}.`,
      })
    }
  }
  async stores(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/stores', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async storeCreate(req, res, next) {
    // const data =await Store.
    const lang = req.params.lang;
    res.render('pages/admin/stores/create', {
      // data,
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async storeEdit(req, res, next) {
    const lang = req.params.lang;
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
          lang,
          data,
          layout:'./layouts/admin/admin',
          extractScripts: true
        })
      } else {
        res.render('pages/error/404', {
          lang,
          message:`Cannot find Category with id=${id}.`,
        })
      }
  }

  async locations(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/locations', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async locationCreate(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/locations/create', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async locationEdit(req, res, next) {
    const lang = req.params.lang;
    const id = req.params.id;
    const data = await Location.findOne({
      where:{id},
      attributes:['id','name','parentId','active'],
      include:[
        {model: Location,
          as:'parent',
          attributes:['id','name','parentId']
        },
      ]
    })
    if (data) {
      res.render('pages/admin/locations/edit', {
        lang,
        data,
        layout:'./layouts/admin/admin',
        extractScripts: true
      })
    } else {
      res.render('pages/error/404', {
        lang,
        message:`Cannot find Location with id=${id}.`,
      })
    }
  }
  async roles(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/roles', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async roleCreate(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/roles/create', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async roleEdit(req, res, next) {
    const lang = req.params.lang;
    const id = req.params.id;
    const data = await Role.findOne({
      where:{id},
      attributes:['id','name'],
      include:[
        {model: Permission,
          as:'permissions',
          attributes:['id']
        },
      ]
    })
    if (data) {
      res.render('pages/admin/roles/edit', {
        lang,
        data,
        layout:'./layouts/admin/admin',
        extractScripts: true
      })
    } else {
      res.render('pages/error/404', {
        lang,
        message:`Cannot find Location with id=${id}.`,
      })
    }
  }

  async users(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/users', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async userCreate(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/admin/users/create', {
      lang,
      layout:'./layouts/admin/admin',
      extractScripts: true
    })
  }

  async userEdit(req, res, next) {
    const lang = req.params.lang;
    const id = req.params.id;
    const data = await User.findOne({
      where:{id},
      attributes: {
        exclude: ['createdAt','updatedAt','userId','password']
      },
      include:[
        {
          model:Store,as:'stores',
          attributes: {
            exclude: ['createdAt','updatedAt','storeId']
          },
          through:{
            attributes: [],
          }
        },
        {model: Document, as: 'documents',
        on: {
          modelName: 'User',
          modelId:{[Op.col]: 'User.id'}
        }
      },
      ]
    })
    console.log(data);
    if (data) {
      res.render('pages/admin/users/edit', {
        data,
        lang,
        layout:'./layouts/admin/admin',
        extractScripts: true
      })
    } else {
      res.render('pages/error/404', {
        lang,
        message:`Cannot find Location with id=${id}.`,
      })
    }
  }
}

module.exports = new PageController()
