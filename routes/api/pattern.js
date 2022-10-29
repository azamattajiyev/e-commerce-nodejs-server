var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const ProductController = require("../../controllers/api/product.controller.js");
    router.post("/",  ProductController.findAllPattern);//permissionVail('read_product'),
    router.post("/show/:id", ProductController.findOne);// permissionVail('read_product'),
    router.post("/store",  ProductController.createPattern);// permissionVail('create_product'),
    router.post("/update/:id",ProductController.updatePattern);//  permissionVail('update_product'),
    router.post("/delete/:id",  ProductController.delete);// permissionVail('delete_product'),
    router.post("/active/:id",  ProductController.active);// permissionVail('delete_product'),
module.exports = router;