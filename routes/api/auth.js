var express = require('express');
const auth = require("../../middleware/auth");
var router = express.Router();
const AuthController = require("../../controllers/api/auth.controller.js");
    router.post("/register", AuthController.register);
    router.post("/login", AuthController.login);
    router.post("/token",  AuthController.token);
    router.post("/logout", auth, AuthController.logout);
module.exports = router;