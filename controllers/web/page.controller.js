const db = require('../../models')

const Op = db.Sequelize.Op

class PageController {

  async login(req, res, next) {

    res.render('pages/auth/login', { title:'Login', layout:'./layouts/empty'})
  }

  async index(req, res, next) {
    res.redirect('/admin/dashboard')
    // res.render('pages/frontend/welcom', {
    //   active_page:'dashboard',
    //   layout:'./layouts/admin/admin',
    //   extractScripts: true
    // })
  }

}

module.exports = new PageController()
