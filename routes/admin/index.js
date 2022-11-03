var express = require('express');
const auth = require("../../middleware/auth");
var router = express.Router();
const PageController = require('../../controllers/web/admin/page.controller.js')
    router.get('/dashboard',PageController.index)
    router.get('/login',PageController.login)

    router.get('/brands',PageController.brands)
    router.get('/brands/create',PageController.brandCreate)
    router.get('/brands/edit/:id',PageController.brandEdit)

    router.get('/orders',PageController.categories)
    router.get('/orders/create',PageController.categoryCreate)
    router.get('/orders/edit/:id',PageController.categoryEdit)

    router.get('/categories',PageController.categories)
    router.get('/categories/create',PageController.categoryCreate)
    router.get('/categories/edit/:id',PageController.categoryEdit)

    router.get('/patterns',PageController.patterns)
    router.get('/patterns/create',PageController.patternCreate)
    router.get('/patterns/edit/:id',PageController.patternEdit)

    router.get('/stores',PageController.stores)
    router.get('/stores/create',PageController.storeCreate)
    router.get('/stores/edit/:id',PageController.storeEdit)

    router.get('/locations',PageController.locations)
    router.get('/locations/create',PageController.locationCreate)
    router.get('/locations/edit/:id',PageController.locationEdit)

    router.get('/users',PageController.categories)
    router.get('/users/create',PageController.categoryCreate)
    router.get('/users/edit/:id',PageController.categoryEdit)

    router.get('/roles',PageController.categories)
    router.get('/roles/create',PageController.categoryCreate)
    router.get('/roles/edit/:id',PageController.categoryEdit)

    router.get('/profile',PageController.categories)
    router.get('/settings',PageController.categories)

    router.get('/products',PageController.products)
    router.get('/products/create',PageController.productCreate)
    router.get('/products/edit/:id',PageController.productEdit)
module.exports = router;