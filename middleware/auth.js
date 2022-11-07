const jwt = require("jsonwebtoken");
const {errorRes} =require("../controllers/common.controller");
const {Role, Permission}=require("../models");
const NodeCache = require("node-cache");
const myCache = new NodeCache( { stdTTL:10000,} );

module.exports =async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith('Bearer '))
            return res.status(200).json(errorRes('Error 401'));
        const token = authHeader.split(' ')[1];
        if (!token)
            return res.status(200).json(errorRes('Access denied.(token yok) error 403'));
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {
            id:decoded.UserInfo.id,
            username:decoded.UserInfo.username,
            name:decoded.UserInfo.name,
        };
        req.permissions=await getPermissions(decoded.UserInfo.roleId);
        next();
    } catch (error) {
        res.status(200).json(errorRes(`Invalid token (token nadogry) ${error}`));
    }
};
const getPermissions= async(roleId)=>{
    if (myCache.has( `role_${roleId}` )) {
        return myCache.get( `role_${roleId}` )
    }
    const role= await Role.findByPk(roleId,{
        attributes: ['name'],
        include:[
            {
                model: Permission,
                as:'permissions',
                through:{
                    attributes: [],
                },
            }
        ],
    })
    result=role.toJSON().permissions;
    console.log(result);
    const success = myCache.set( `role_${roleId}`,result )
    return result
}