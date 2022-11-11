var express = require('express');
const auth = require("../../middleware/auth");
const lang = require("../../middleware/lang");
var router = express.Router();
const PageController = require('../../controllers/web/page.controller.js')
const AuthController = require("../../controllers/web/auth.controller.js");
    router.get("/:lang/register",lang, PageController.registerlang);
    router.get("/register", PageController.register);
    router.post("/:lang/register", AuthController.register);

    router.get('/login',PageController.login)
    router.get('/:lang/login',lang,PageController.loginlang)
    router.post("/:lang/login", AuthController.login);
    router.get("/logout",lang,auth, AuthController.logout)
module.exports = router;