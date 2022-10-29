var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const LikeController = require("../../controllers/api/like.controller.js");
    router.post("/",  LikeController.findAll);//permissionVail('read_brand'),
    router.post("/show/:id", LikeController.findOne);// permissionVail('read_brand'),
    router.post("/store",  LikeController.create);// permissionVail('create_brand'),
    router.post("/update/:id",LikeController.update);//  permissionVail('update_brand'),
    router.post("/delete/:id",  LikeController.delete);// permissionVail('delete_brand'),
    router.post("/active/:id",  LikeController.active);// permissionVail('delete_brand'),
module.exports = router;