var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const BrandController = require("../../controllers/api/brand.controller.js");
    router.post("/", BrandController.findAll);//permissionVail('read_brand'),
    router.post("/select2",  BrandController.findAllselect2);//permissionVail('read_brand'),
    router.post("/select_one/:id", BrandController.findOne);// permissionVail('read_brand'),
    router.post("/show/:id", BrandController.findOne);// permissionVail('read_brand'),
    router.post("/store",  BrandController.create);// permissionVail('create_brand'),
    router.post("/update/:id",BrandController.update);//  permissionVail('update_brand'),
    router.post("/delete/:id",  BrandController.delete);// permissionVail('delete_brand'),
    router.post("/active/:id",  BrandController.active);// permissionVail('delete_brand'),
module.exports = router;