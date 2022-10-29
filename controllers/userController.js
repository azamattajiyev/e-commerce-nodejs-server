const { Permission, User, User_has_Permission } = require('../models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class userController {
	async register(req, res, next) {
		try {
			const { username, password} = req.body;
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
				password: hashedPassword
			});
			permissions.forEach(async (el) => {
				await User_has_Permission.create({
					UserId: newUser.id,
					PermissionId: el
				});
			});
			res.json({ message: `${newUser.username} atly ulanyjy üstünlikli döredildi` });
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
	async getPermissions(req, res, next) {
		try {
			const permissions = await Permission.findAll();
			res.json(permissions);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
	async login(req, res, next) {
		try {
			const { username, password } = req.body;
			const conditate = await User.findOne({
				where: { username }
			});
			if (!conditate) return next(ApiError.badRequest('Ulanyjy tapylmady'));
			const pass = await bcrypt.compare(password, conditate.password);
			if (!pass) return next(ApiError.badRequest('Parol nadogry'));
			const pers = await User_has_Permission.findAll({
				attributes: [ 'PermissionId' ],
				where: { UserId: conditate.id }
			});
			let permissions = [];
			pers.forEach((e) => {
				permissions.push(e.PermissionId);
			});
			const token = jwt.sign({ username: conditate.username, permissions }, process.env.SECRET);
			res.json({ token });
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
}

module.exports = new userController();
