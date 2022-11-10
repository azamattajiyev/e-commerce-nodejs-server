var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const RoleController = require("../../controllers/api/role.controller.js");
    router.post("/", RoleController.index);//permissionVail('read_role'), 
    router.post("/permissions", RoleController.permissions);// permissionVail('create_role'),
    router.post("/select2",  RoleController.findAllselect2);//permissionVail('read_brand'),
    router.post("/store",  RoleController.create);// permissionVail('create_role'),
    router.post("/show/:id", RoleController.show);// permissionVail('read_brand'),
    router.post("/update/:id",RoleController.update);//  permissionVail('update_brand'),
    router.post("/delete/:id",  RoleController.delete);// permissionVail('delete_brand'),
module.exports = router;