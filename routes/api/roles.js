var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const RoleController = require("../../controllers/api/role.controller.js");
    router.post("/", permissionVail('read_role'), RoleController.index);
    router.post("/permissions", permissionVail('create_role'), RoleController.permissions);
    router.post("/create",  permissionVail('create_role'), RoleController.create);
module.exports = router;