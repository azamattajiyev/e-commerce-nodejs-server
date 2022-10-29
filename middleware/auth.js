const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith('Bearer ')) return res.status(200).json({
            success: false,
            message: 'Error 401'
        });

        const token = authHeader.split(' ')[1];
        if (!token) return  res.status(200).json({
            success: false,
            message: 'Access denied.(token yok) error 403'
        });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {
            username:decoded.UserInfo.username,
            name:decoded.UserInfo.name,
        };
        req.permissions=decoded.UserInfo.permissions;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Invalid token (token nadogry) ${error}`
        });
    }
};