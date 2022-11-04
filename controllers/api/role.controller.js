const {Role,Permission,RoleHasPermission} = require("../../models");
const {paginateData,errorRes,successRes,selecteditem} =require("../common.controller");
const {Op} = require('sequelize');
const NodeCache = require("node-cache");
const myCache = new NodeCache( { stdTTL:1000,} );

class RoleController{
    async index(req, res, next) {try{
        var condition = {}
        let {page,limit,search} = req.body
        // console.log(page,limit,search);
        if (search) {
            for (const [key, value] of Object.entries(search)) {
                if(value!=''){
                    condition[key] = { [Op.like]: `%${value}%` }
                }
            }
        }
        const offset = page ? ((page-1)*limit) : 0;
        // console.log(offset);
        const data= await Role.findAndCountAll({
            limit:parseInt(limit),
            offset,
            where: condition,
            // attributes: {
            //     exclude: ['parentId', 'createdAt','updatedAt']
            // },
        })
        res.status(200).json(paginateData(data,limit,page));
        } catch (error) {
            res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Roles."));
        }
    }

    async permissions(req, res, next) {
        try{
            let result=[]
            let {page,limit,search} = req.body
            console.log(page,limit,search);
            if (myCache.has( "myPermission" )) {
                result=myCache.get( "myPermission" )
                if (search && search.selectedIds) {
                    result= selecteditem(result,search.selectedIds)
                }
                return res.status(200).json(successRes(result));
            }
            const data= await Permission.findAndCountAll({
                attributes:['id','name']
            })
            for (let i = 0; i < data.count; i++) {
                const el = data.rows[i];
                result.push({id:el.id,name:el.name,selected:false})
            }
            const success = myCache.set('myLocation',result)
            if (search && search.selectedIds) {
                result= selecteditem(result,search.selectedIds)
            }
            res.status(200).json(successRes(result));
        } catch (error) {
            res.status(200).json(errorRes(error.message || "Some error occurred while retrieving Categories."));
        }
    }

    async create (req, res) {
        try{
            const {
                nameTm,
                nameRu,
                permissions,
            } =req.body
            // console.log(req.body);
            if (
                !nameTm ||
                !nameRu ||
                !permissions
                ) {
                res.json(errorRes('Content can not be empty!'));
                return;
            }
            // Create a Role
            const newRole = {
                name:JSON.stringify({
                    tm:nameTm,
                    ru:nameRu
                }),
            };
            // Save Brand in the database
            let data = await Role.create(newRole)
            if (data) {
                await RoleHasPermission.savePermissions(data.dataValues.id,permissions)
            }
            res.status(200).json(successRes(data,`${data.name} atly role üstünlikli döredildi`));
        } catch (error) {
            res.status(200).json(errorRes(error.message));
        }
    }


    async update(req, res, next) {
        try{
            const id = req.params.id;
            const {
                nameTm,
                nameRu,
                permissions,
            } =req.body
            // console.log(req.body);
            if (
                !nameTm ||
                !nameRu ||
                !permissions
                ) {
                res.json(errorRes('Content can not be empty!'));
                return;
            }
            // Create a Role
            const newRole = {
                name:JSON.stringify({
                    tm:nameTm,
                    ru:nameRu
                }),
            };
            let data =await Role.update(newRole, {
                where: { id:id }
            })
            if (data) {
                await RoleHasPermission.clearAllById(id)
                await RoleHasPermission.savePermissions(id,permissions)
            }
            res.status(200).json(successRes(null,"Role was updated successfully."));
        } catch (error) {
            console.log(error.message);
            res.status(200).json(errorRes(error.message));
        }
    }

    async show(req, res, next) {
        try{
            const id = req.params.id;
            const data = await Role.findByPk(id,{
                attributes:['id','name'],
                include:[
                    {model}
                ]
            })
            if (data) {
                data.dataValues.parends=await Location.getAllParents(data.dataValues.parentId)
                res.status(200).json(successRes(data));
            } else {
                res.status(200).json(errorRes(`Cannot find Location with id=${id}.`));
            }
        } catch (error) {
            res.status(200).json(errorRes("Error retrieving Location with id=" + id));
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const num=await Role.destroy({
                where: { id: id }
            })
            if (num == 1) {
                await RoleHasPermission.clearAllById(id)
                res.status(200).json(successRes(null,"Role was deleted successfully!"));
            } else {
                res.status(200).json(errorRes(`Cannot delete Role with id=${id}. Maybe Role was not found!`));
            }
        } catch (error) {
            res.status(200).json(errorRes( "Could not delete Role with id=" + id +" "+error.message));
        }
    }

}

module.exports = new RoleController();