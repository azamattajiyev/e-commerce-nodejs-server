var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const StoreController = require("../../controllers/api/store.controller.js");
    router.post("/",  StoreController.findAll);//permissionVail('read_Store'),
    router.post("/show/:id", StoreController.findOne);// permissionVail('read_Store'),
    router.post("/store",  StoreController.create);// permissionVail('create_Store'),
    router.post("/update/:id",StoreController.update);//  permissionVail('update_Store'),
    router.post("/delete/:id",  StoreController.delete);// permissionVail('delete_Store'),
    router.post("/active/:id",  StoreController.active);// permissionVail('delete_Store'),
module.exports = router;