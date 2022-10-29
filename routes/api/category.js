var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const CategoryController = require("../../controllers/api/category.controller.js");
    router.post("/",  CategoryController.findAll);//permissionVail('read_brand'),
    router.post("/select2",  CategoryController.findAllselect2);//permissionVail('read_brand'),
    router.post("/show/:id", CategoryController.findOne);// permissionVail('read_brand'),
    router.post("/select_one/:id", CategoryController.findSelectOne);// permissionVail('read_brand'),
    router.post("/store",  CategoryController.create);// permissionVail('create_brand'),
    router.post("/update/:id",CategoryController.update);//  permissionVail('update_brand'),
    router.post("/delete/:id",  CategoryController.delete);// permissionVail('delete_brand'),
    router.post("/active/:id",  CategoryController.active);// permissionVail('delete_brand'),
module.exports = router;