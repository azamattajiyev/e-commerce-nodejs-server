var express = require('express');
const permissionVail = require("../../middleware/role");
const auth_m = require("../../middleware/auth");
var router = express.Router();
const CardController = require("../../controllers/api/card.controller.js");
    router.post("/store",  CardController.create);// permissionVail('create_card'),
    router.post("/edit/:id",CardController.update);//  permissionVail('update_card'),
    router.get("/delete/:id",  CardController.delete);// permissionVail('delete_card'),
    router.post("/active/:id",  CardController.active);// permissionVail('delete_card'),
module.exports = router;