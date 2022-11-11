const db = require('../../models')
const {User,}=require("../../models");
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')

class AuthController {

  async login(req, res) {
    const lang = req.params.lang;
    try {
      const { password } = req.body
      let { username } = req.body
      console.log(req);
      if (!password || !username) {
        return  res.render('pages/auth/login', {
          lang,
          title:'Login',
          message:{
            tm:'username we password doly bolmaly',
            ru:'username we password doly bolmaly',
          },
          layout:'./layouts/auth',
          extractScripts: true
        })
      }
      username = username.toLowerCase()
      const user = await User.findOne({
        where:{
            username,
        },
        attributes: {
          exclude:['userId']
        },
      });
      if (!user) {
        return  res.render('pages/auth/login', {
          lang,
          title:'Login',
          message:{
            tm:'username ya-da password nadogry tazeden synanshyn',
            ru:'username ya-da password nadogry tazeden synanshyn',
          },
          layout:'./layouts/auth',
          extractScripts: true
        })
      }
      // let pass = false

      const pass = await bcrypt.compare(password, user.password)

      if (!pass) {
        return  res.render('pages/auth/login', {
          lang,
          title:'Login',
          message:{
            tm:'Incorrect Username and/or Password!',
            ru:'Incorrect Username and/or Password!',
          },
          layout:'./layouts/auth',
          extractScripts: true
        })
      }
      req.session.loggedin = true
      req.session.username = user.name
      res.redirect('/')
    } catch (e) {
      console.log(e)
      return res.render('pages/error/500', {
        lang,
        layout:'./layouts/error',
        extractScripts: true,
        status:500,
        message:{
          tm:'Server error: '+e,
          ru:'Server error: '+e,
        },
    })
    }
  }
  async register(req, res) {
    const lang = req.params.lang;
    try {
      const { password, name} = req.body;
      let {username} = req.body;
      if (!password || !username || !name) {
        return  res.render('pages/auth/register', {
          lang,
          title:'Register',
          message:{
            tm:'name, username we password doly bolmaly',
            ru:'name, username we password doly bolmaly',
          },
          layout:'./layouts/auth',
          extractScripts: true
        })
      }
      username = username.toLowerCase();
      const user = await User.findOne({
        where:{
            username,
        },
        attributes: {
          exclude:['userId']
        },
      });
      if (user) {
        return  res.render('pages/auth/register', {
          lang,
          title:'Register',
          message:{
            tm:'Ulanyjy öňem bar',
            ru:'Ulanyjy öňem bar',
          },
          layout:'./layouts/auth',
          extractScripts: true
        })
      }
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = await User.create({
        name,
				username,
				password: hashedPassword,
				roleId:2 //default role user
			});
      req.session.loggedin = true
      req.session.username = newUser.username
      res.redirect('/')
		} catch (e) {
      console.log(e)
      return res.render('pages/error/500', {
        lang,
        layout:'./layouts/error',
        extractScripts: true,
        status:500,
        message:{
          tm:'Server error: '+e,
          ru:'Server error: '+e,
        },
    })
    }
	}
  async logout(req, res) {
    res.clearCookie('myCookie')
    req.session.destroy(function (err) {
      res.redirect(`/${lang}/`)
    })
  }

}

module.exports = new AuthController()
