var express = require('express');
const auth_m = require("../../middleware/auth");
const category = require("./category");
const location = require("./location");
const store = require("./store");
const brand = require("./brand");
const product = require("./product");
const pattern = require("./pattern");
const user = require("./user");
const roles = require("./roles");
const auth = require("./auth");
var router = express.Router();
    router.use('/categories', category)
    router.use('/locations', location)
    router.use('/brands', auth_m, brand)
    router.use('/stores', store)
    router.use('/products', product)
    router.use('/patterns', pattern)
    router.use('/users', user)
    router.use('/roles',  roles)//auth_m,
    router.use('/auth',auth)
module.exports = router;