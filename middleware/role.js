module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.permissions)  return  res.status(200).json({
            success: false,
            message: 'Access denied.(rugsat yok) error 401'
        });
        const rolesArray = [...allowedRoles];
        const result = req.permissions.map(role => rolesArray.includes(role.key)).find(val => val === true);
        if (!result) return  res.status(200).json({
            success: false,
            message: 'Access denied.(rugsat yok) error 401'
        });
        next();
    }
}

