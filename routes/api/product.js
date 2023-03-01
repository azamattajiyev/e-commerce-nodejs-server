var express = require('express');
const permissionVail = require("../../middleware/role");
const auth_m = require("../../middleware/auth");
var router = express.Router();
const ProductController = require("../../controllers/api/product.controller.js");
    router.post("/",  ProductController.findAll);//permissionVail('read_product'),
    router.post("/test",  ProductController.findAllTest);//permissionVail('read_product'),
    router.post("/show/:id", ProductController.findOne);// permissionVail('read_product'),
    router.post("/store",  ProductController.create);// permissionVail('create_product'),
    router.post("/update/:id",ProductController.update);//  permissionVail('update_product'),
    router.post("/delete/:id",  ProductController.delete);// permissionVail('delete_product'),
    router.post("/active/:id",  ProductController.active);// permissionVail('delete_product'),
    router.post("/search/",  ProductController.search);// permissionVail('delete_product'),
    router.get("/like/:id",auth_m,  ProductController.like);// permissionVail('delete_product'),
    router.post("/pc",  ProductController.getAllProducts);// permissionVail('delete_product'),
    router.post("/pe",auth_m,  ProductController.getAllProducts);// permissionVail('delete_product'),
module.exports = router;