const db = require('../../models')
const User = db.users
const Role = db.roles
const Permission = db.permissions
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthController {

  async login(req, res) {
    try {
      const { password } = req.body
      let { user_name } = req.body
      if (!password && !user_name) {
        return res.status(200).json({
          success: false,
          message: 'username we password doly bolmaly',
        })
      }
      user_name = user_name.toLowerCase()
      const user = await User.findOne({
        where: {
          user_name,
        },
      })
      if (!user) {
        return res.status(200).json({
          success: false,
          message: 'username ya-da password nadogry tazeden synanshyn',
        })
      }
      // let pass = false

      const pass = await bcrypt.compare(password, user.password)

      if (!pass) {
        return res.send('Incorrect Username and/or Password!')
      }
      req.session.loggedin = true
      req.session.username = user.name
      res.redirect('/')
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  }
  async logout(req, res) {
    res.clearCookie('myCookie')
    req.session.destroy(function (err) {
      res.redirect('/')
    })
  }

}

module.exports = new AuthController()
