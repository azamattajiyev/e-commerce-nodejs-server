const db = require("../../models");
const {User, Permission,Role}=require("../../models");
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {errorRes,successRes,excludes} =require("../common.controller");

class AuthController{
  async register(req, res, next) {
		try {
      const {password ,name} = req.body;
      let {username} = req.body;
      if (!password || !username || !name) {
        return res.status(200).json(errorRes('name, username we password doly bolmaly'));
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
			if (user) return res.status(200).json(errorRes('Ulanyjy öňem bar'));
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = await User.create({
        name,
				username,
				password: hashedPassword,
				roleId:2 //default role user
			});
      if(newUser){
        return res.status(200).json(await getUserTokens(username));
      }
      res.status(200).json(errorRes('Ulanyjy doredilmedi.'));
		} catch (error) {
      res.status(200).json(errorRes(error.message));
		}
	}
  async login(req, res){
      try{
        const {password } = req.body;
        let {username} = req.body;
        if (!password || !username) {
          return res.status(200).json(errorRes('username we password doly bolmaly'));
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
        if(!user) {
          return res.status(200).json(errorRes('username ya-da password nadogry tazeden synanshyn'));
        }
        const pass = await bcrypt.compare(password, user.password)
        if(!pass){
          return res.status(200).json(errorRes('username ya-da password nadogry tazeden synanshyn'));
        }
        return res.status(200).json(await getUserTokens(username));
      }catch(e){
        console.log(e);
        res.status(200).json(errorRes(`Server error: ${e}`));
      }
  }

  async logout(req, res){
    try{
      const refresh_token = req.body.token
      console.log(refresh_token);
      if (refresh_token == null) {
        return res.status(200).json(errorRes('token bosh grldi'));
      }
      if (!refresh_token.includes(refresh_token)) {
        return res.status(200).json(errorRes('inkar edildi'));
      }
      return jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){
          return res.status(200).json(errorRes('inkar edildi'));
        }
        return res.status(200).json(successRes(null,'user is logout'));
      })
    }catch(e){
      console.log(e);
      res.status(200).json(errorRes(`Server error: ${e}`));
    }
  }

  async token(req, res){
      try{
        const token = req.body.token
        if (token == null) {
          return res.status(200).json(errorRes('token bosh grldi'));
        }
        if (!token.includes(token)) {
          return res.status(200).json(errorRes('inkar edildi'));
        }
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,async(err, user) => {
          if (err){
            return res.status(200).json(errorRes('inkar edildi'));
          }
          console.log(user);
          return res.status(200).json(await getUserTokens(user.UserInfo.username));
        })
      }catch(e){
        console.log(e);
        res.status(200).json(errorRes(`Server error: ${e}`));
      }
  }

}
const generateAccessToken = (user,expiresIn) =>{
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn:expiresIn+'s'})
}
const generateRefreshToken = (user) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
const getUserTokens =async (username,) => {
  let accessTokenLifeTime= '3600'
  const user =await User.findOne({
    where:{
      username
    },
    attributes: {
      exclude:excludes.user
    },
    include:[
      {model: Role,
        as:'role',
        attributes: ['name'],
        include:[
          {model: Permission,
            as:'permissions',
          }
        ],
      },
    ]
  })
  let UserInfo ={
    UserInfo:{
      id:user.id,
      username: user.username,
      name: user.name,
      roleId: user.roleId,
    }
  }
  return successRes({
    accessToken:generateAccessToken(UserInfo,accessTokenLifeTime),
    refreshToken:generateRefreshToken(UserInfo),
    livetime: accessTokenLifeTime
  })
}


module.exports = new AuthController();