const db = require("../../models");
const User = db.users;
const Role = db.roles;
const Permission = db.permissions;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController{
  async register(req, res, next) {
		try {
			const { username, password ,roleId} = req.body;
			const candidate = await User.findOne({
				where: { username }
			});
			const hashedPassword = await bcrypt.hash(password, 10);
			if (candidate)  res.json({
				success: false,
				message: 'Ulanyjy öňem bar'
			});
			// if (!permissions) return next(ApiError.badRequest('Hiç hili ygtyýarlyksyz ulanyjy bolup bilmez'));
			const newUser = await User.create({
				username,
				password: hashedPassword,
				roleId:roleId ??2 //default role user
			});
			// permissions.forEach(async (el) => {
			// 	await User_has_Permission.create({
			// 		UserId: newUser.id,
			// 		PermissionId: el
			// 	});
			// });
      res.status(200).json({
        success: true,
        message: `${newUser.username} atly ulanyjy üstünlikli döredildi`
      });
		} catch (error) {
      res.status(200).json({
        success: false,
        message: error.message
      });
		}
	}
  async login(req, res){
      try{
          const {password } = req.body;
          let {username} = req.body;
          if (!password && !username) {
            return res.status(200).json({
              success: false,
              message: 'username we password doly bolmaly'
            });
          }
          username = username.toLowerCase();
          const user = await User.findOne({
              where:{
                  username,
              }
          });
          if(!user) {
            return res.status(200).json({
              success: false,
              message: 'username ya-da password nadogry tazeden synanshyn'
            });
          }
          const role= await Role.findOne({
            where:{
                id:user.roleId,
            },
            include:[ Permission,]
        });
          const pass = await bcrypt.compare(password, user.password)
          if(!pass){
            return res.status(200).json({
              success: false,
              message: 'username ya-da password nadogry tazeden synanshyn'
            });
          }
          let UserInfo ={
            UserInfo:{
              id:user.id,
              username: user.username,
              name: user.name,
              permissions: role.permissions,
            }
          }
          const accessToken = jwt.sign(UserInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
          const refreshToken = jwt.sign(UserInfo, process.env.REFRESH_TOKEN_SECRET);
          res.status(200).json({
            success: true,
            message: 'ok',
            data:{
              accessToken,
              refreshToken,
            }
          });
      }catch(e){
        console.log(e);
        res.status(200).json({
          success: false,
          message: `Server error: ${e}`
        });
      }
  }

  async logout(req, res){
    try{
      const refresh_token = req.body.token
      if (refresh_token == null) {
        return res.status(200).json({
          success: false,
          message: 'token bosh grldi'
        });
      }
      if (!refresh_token.includes(refresh_token)) {
        return res.status(200).json({
          success: false,
          message: 'inkar edildi'
        });
      }
      jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){
          return res.status(200).json({
            success: false,
            message: 'inkar edildi'
          });
        }
        const accessToken =jwt.sign({username: user.username, id: user.id, name:user.name},
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
        res.status(200).json({
          success: true,
          message: 'ok',
          data:{
            accessToken
          }
        });
      })
    }catch(e){
      console.log(e);
      res.status(200).json({
        success: false,
        message: `Server error: ${e}`
      });
    }
  }

  async token(req, res){
      try{
          const token = req.body.token
          if (token == null) {
            return res.status(200).json({
              success: false,
              message: 'token bosh grldi'
            });
          }
          if (!token.includes(token)) {
            return res.status(200).json({
              success: false,
              message: 'inkar edildi'
            });
          }
          jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
              if (err){
                return res.status(200).json({
                  success: false,
                  message: 'inkar edildi'
                });
              }
              const accessToken =jwt.sign({username: decoded.username, id: decoded.id, name:decoded.name},
                  process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
              res.status(200).json({
                success: true,
                message: 'ok',
                data:{
                  accessToken
                }
              });
          })
      }catch(e){
        console.log(e);
        res.status(200).json({
          success: false,
          message: `Server error: ${e}`
        });
      }
  }

  generateAccessToken (user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
  }

}

module.exports = new AuthController();