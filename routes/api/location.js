var express = require('express');
const permissionVail = require("../../middleware/role");
var router = express.Router();
const LocationController = require("../../controllers/api/location.controller.js");
    router.post("/",  LocationController.findAll);//permissionVail('read_brand'),
    router.post("/show/:id", LocationController.findOne);// permissionVail('read_brand'),
    router.post("/store",  LocationController.create);// permissionVail('create_brand'),
    router.post("/update/:id",LocationController.update);//  permissionVail('update_brand'),
    router.post("/delete/:id",  LocationController.delete);// permissionVail('delete_brand'),
    router.post("/active/:id",  LocationController.active);// permissionVail('delete_brand'),
module.exports = router;