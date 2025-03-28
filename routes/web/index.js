var express = require('express');
const auth = require("../../middleware/web_auth");
const lang = require("../../middleware/lang");
const auths = require("./auth");
const PageController = require('../../controllers/web/page.controller.js')
var router = express.Router();
    router.use('/', auths)
    router.get('/', PageController.indexlang)
    router.get('/:lang/', PageController.index)
module.exports = router;