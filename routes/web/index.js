var express = require('express');
const auth = require("../../middleware/web_auth");
const PageController = require('../../controllers/web/page.controller.js')
var router = express.Router();
    router.get('/', PageController.index)
module.exports = router;