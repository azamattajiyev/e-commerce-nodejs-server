const db = require('../../models')
require('dotenv').config();
const Op = db.Sequelize.Op
const defoult_lang=process.env.LANG_DEFOULT||'tm'
class PageController {
  async login(req, res, next) {
    res.redirect(`/${defoult_lang}/login`)
  }
  async loginlang(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/auth/login', {
      lang,
      title:'Login',
      message:'',
      layout:'./layouts/auth',
      extractScripts: true
    })
  }

  async register(req, res, next) {
    res.redirect(`/${defoult_lang}/register`)
  }
  async registerlang(req, res, next) {
    const lang = req.params.lang;
    res.render('pages/auth/register', {
      lang,
      message:'',
      title:'Register',
      layout:'./layouts/auth',
      extractScripts: true})
  }

  async index(req, res, next) {
    const lang = req.params.lang;
    res.redirect(`/${lang}/admin/dashboard`)
  }
  async indexlang(req, res, next) {
    res.redirect(`/${defoult_lang}/`)
  }

}

module.exports = new PageController()
