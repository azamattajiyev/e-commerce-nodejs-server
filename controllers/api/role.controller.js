const {Role,Permission,RoleHasPermission} = require("../../models");
const {Op} = require('sequelize');

class RoleController{
    async index(req, res, next) {
        try{
            const name = req.query.name;
            var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
            const roles = await Role.findAll({
                where: condition,
                include:[Permission ]
            });
            res.json({
				success: true,
				message: 'ok',
                data:roles
			});
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            });
        }
    }

    async permissions(req, res, next) {
        try{
            const permissions = await Permission.findAll();
            res.json({
				success: true,
				message: 'ok',
                data:permissions
			});
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            });
        }
    }

    async create (req, res) {
        // Validate request
        if (!req.body.name) {
            res.status(200).json({
                success: false,
                message: "Content can not be empty!"
            });
            return;
        }
        const {name, permissions } = req.body;

        try{
            const role= await Role.create({
                name
            });
            for(const permissionId of permissions) {
                RoleHasPermission.create({
                    permissionId,
                    roleId:role.id
                })
            }
            res.json({
				success: true,
				message: 'Role created',
			});
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            });
        }
    }


    async update(req, res, next) {
        try{
            const { id } = req.params;
            const user = await Role.findOne({
                where:{
                    id,
                }
            });
            const {name, password } = req.body;
            let {username} = req.body;

            if (name) user.name = name;
            if (username) user.username = username.toLowerCase();
            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password ,salt);
                user.password=hashedPassword
            }
            user.save();
            res.send(user)
        }catch(e){
            res.status(500).send({error: e});
            console.log(e);
        }
    }

    async show(req, res, next) {
        try{
            const { id } = req.params;
            const user = await User.findOne({
                where:{
                    id,
                }
            });
            res.send(user);
        }catch(e){
            res.status(500).send({error: e});
            console.log(e);
        }
    }

    async delete(req, res, next) {
        try{
            const { id } = req.params;
            const role = await Role.findOne({
                where:{
                    id,
                }
            });
            await role.destroy();
            res.send({
                message:`role id ${id} deleted!`
            });
        }catch(e){
            res.status(500).send({error: e});
            console.log(e);
        }
    }

}

module.exports = new RoleController();