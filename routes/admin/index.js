var express = require('express');
const auth = require("../../middleware/auth");
const lang = require("../../middleware/lang");
var router = express.Router();
const PageController = require('../../controllers/web/admin/page.controller.js')
    router.get('/:lang/admin/dashboard',lang,PageController.index)
    router.get('/login',PageController.login)

    router.get('/:lang/admin/brands',lang,PageController.brands)
    router.get('/:lang/admin/brands/create',lang,PageController.brandCreate)
    router.get('/:lang/admin/brands/edit/:id',lang,PageController.brandEdit)

    router.get('/:lang/admin/orders',lang,PageController.categories)
    router.get('/:lang/admin/orders/create',lang,PageController.categoryCreate)
    router.get('/:lang/admin/orders/edit/:id',lang,PageController.categoryEdit)

    router.get('/:lang/admin/categories',lang,PageController.categories)
    router.get('/:lang/admin/categories/create',lang,PageController.categoryCreate)
    router.get('/:lang/admin/categories/edit/:id',lang,PageController.categoryEdit)

    router.get('/:lang/admin/patterns',lang,PageController.patterns)
    router.get('/:lang/admin/patterns/create',lang,PageController.patternCreate)
    router.get('/:lang/admin/patterns/edit/:id',lang,PageController.patternEdit)

    router.get('/:lang/admin/stores',lang,PageController.stores)
    router.get('/:lang/admin/stores/create',lang,PageController.storeCreate)
    router.get('/:lang/admin/stores/edit/:id',lang,PageController.storeEdit)

    router.get('/:lang/admin/locations',lang,PageController.locations)
    router.get('/:lang/admin/locations/create',lang,PageController.locationCreate)
    router.get('/:lang/admin/locations/edit/:id',lang,PageController.locationEdit)

    router.get('/:lang/admin/users',lang,PageController.users)
    router.get('/:lang/admin/users/create',lang,PageController.userCreate)
    router.get('/:lang/admin/users/edit/:id',lang,PageController.userEdit)

    router.get('/:lang/admin/roles',lang,PageController.roles)
    router.get('/:lang/admin/roles/create',lang,PageController.roleCreate)
    router.get('/:lang/admin/roles/edit/:id',lang,PageController.roleEdit)

    router.get('/:lang/admin/profile',lang,PageController.categories)
    router.get('/:lang/admin/settings',lang,PageController.categories)

    router.get('/:lang/admin/products',lang,PageController.products)
    router.get('/:lang/admin/products/create',lang,PageController.productCreate)
    router.get('/:lang/admin/products/edit/:id',lang,PageController.productEdit)
module.exports = router;