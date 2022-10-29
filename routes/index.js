var express = require('express');
const api = require("./api");
const web = require("./web");
const admin = require("./admin");
var router = express.Router();
    router.use('/', web)
    router.use('/api', api)
    router.use('/admin', admin)
module.exports = router;