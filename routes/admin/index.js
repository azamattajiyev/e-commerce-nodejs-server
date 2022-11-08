var express = require('express');
const auth = require("../../middleware/auth");
var router = express.Router();
const PageController = require('../../controllers/web/admin/page.controller.js')
    router.get('/:lang/admin/dashboard',PageController.index)
    router.get('/login',PageController.login)

    router.get('/:lang/admin/brands',PageController.brands)
    router.get('/:lang/admin/brands/create',PageController.brandCreate)
    router.get('/:lang/admin/brands/edit/:id',PageController.brandEdit)

    router.get('/:lang/admin/orders',PageController.categories)
    router.get('/:lang/admin/orders/create',PageController.categoryCreate)
    router.get('/:lang/admin/orders/edit/:id',PageController.categoryEdit)

    router.get('/:lang/admin/categories',PageController.categories)
    router.get('/:lang/admin/categories/create',PageController.categoryCreate)
    router.get('/:lang/admin/categories/edit/:id',PageController.categoryEdit)

    router.get('/:lang/admin/patterns',PageController.patterns)
    router.get('/:lang/admin/patterns/create',PageController.patternCreate)
    router.get('/:lang/admin/patterns/edit/:id',PageController.patternEdit)

    router.get('/:lang/admin/stores',PageController.stores)
    router.get('/:lang/admin/stores/create',PageController.storeCreate)
    router.get('/:lang/admin/stores/edit/:id',PageController.storeEdit)

    router.get('/:lang/admin/locations',PageController.locations)
    router.get('/:lang/admin/locations/create',PageController.locationCreate)
    router.get('/:lang/admin/locations/edit/:id',PageController.locationEdit)

    router.get('/:lang/admin/users',PageController.users)
    // router.get('/:lang/admin/users/create',PageController.userCreate)
    router.get('/:lang/admin/users/edit/:id',PageController.userEdit)

    router.get('/:lang/admin/roles',PageController.roles)
    router.get('/:lang/admin/roles/create',PageController.roleCreate)
    router.get('/:lang/admin/roles/edit/:id',PageController.roleEdit)

    router.get('/:lang/admin/profile',PageController.categories)
    router.get('/:lang/admin/settings',PageController.categories)

    router.get('/:lang/admin/products',PageController.products)
    router.get('/:lang/admin/products/create',PageController.productCreate)
    router.get('/:lang/admin/products/edit/:id',PageController.productEdit)
module.exports = router;