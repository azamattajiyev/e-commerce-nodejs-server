const db = require('../../models')

const Op = db.Sequelize.Op

class PageController {

  async login(req, res, next) {

    res.render('pages/auth/login', { title:'Login', layout:'./layouts/empty'})
  }

  async index(req, res, next) {
    const lang = req.params.lang;
    res.redirect(`/${lang}/admin/dashboard`)
  }
  async indexlang(req, res, next) {
    res.redirect('/tm/')
  }

}

module.exports = new PageController()
