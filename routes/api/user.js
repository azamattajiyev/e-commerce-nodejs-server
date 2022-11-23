var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const UserController = require("../../controllers/api/user.controller.js");
    router.post("/",  UserController.findAll);//permissionVail('read_user'),
    router.get("/show/:id", UserController.findOne);// permissionVail('read_user'),
    router.post("/store",  UserController.create);// permissionVail('create_user'),
    router.post("/update/:id",UserController.update);//  permissionVail('update_user'),
    router.post("/delete/:id",  UserController.delete);// permissionVail('delete_user'),
    router.post("/active/:id",  UserController.active);// permissionVail('delete_user'),
module.exports = router;