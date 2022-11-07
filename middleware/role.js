const {errorRes} =require("../controllers/common.controller");

module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.permissions)
            return res.status(200).json(errorRes('Access denied.(rugsat yok) error 401'));
        const rolesArray = [...allowedRoles];
        const result = req.permissions.map(role => rolesArray.includes(role.key)).find(val => val === true);
        if (!result)
            return res.status(200).json(errorRes('Access denied.(rugsat yok) error 401'));
        next();
    }
}

