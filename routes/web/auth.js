var express = require('express');
const auth = require("../../middleware/auth");
var router = express.Router();
const PageController = require('../../controllers/web/page.controller.js')
const AuthController = require("../../controllers/web/auth.controller.js");
    // router.post("/register", AuthController.register);
    router.get('/login',PageController.login)
    router.post("/login", AuthController.login);
    router.get("/logout",auth, AuthController.logout)
module.exports = router;