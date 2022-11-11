var express = require('express');
const auth = require("../../middleware/web_auth");
const lang = require("../../middleware/lang");
var router = express.Router();
const PageController = require('../../controllers/web/admin/page.controller.js')
    router.get('/:lang/admin/dashboard',auth,lang,PageController.index)
    router.get('/admin/login',PageController.login)

    router.get('/:lang/admin/brands',auth,lang,PageController.brands)
    router.get('/:lang/admin/brands/create',auth,lang,PageController.brandCreate)
    router.get('/:lang/admin/brands/edit/:id',auth,lang,PageController.brandEdit)

    router.get('/:lang/admin/orders',auth,lang,PageController.categories)
    router.get('/:lang/admin/orders/create',auth,lang,PageController.categoryCreate)
    router.get('/:lang/admin/orders/edit/:id',auth,lang,PageController.categoryEdit)

    router.get('/:lang/admin/categories',auth,lang,PageController.categories)
    router.get('/:lang/admin/categories/create',auth,lang,PageController.categoryCreate)
    router.get('/:lang/admin/categories/edit/:id',auth,lang,PageController.categoryEdit)

    router.get('/:lang/admin/patterns',auth,lang,PageController.patterns)
    router.get('/:lang/admin/patterns/create',auth,lang,PageController.patternCreate)
    router.get('/:lang/admin/patterns/edit/:id',auth,lang,PageController.patternEdit)

    router.get('/:lang/admin/stores',auth,lang,PageController.stores)
    router.get('/:lang/admin/stores/create',auth,lang,PageController.storeCreate)
    router.get('/:lang/admin/stores/edit/:id',auth,lang,PageController.storeEdit)

    router.get('/:lang/admin/locations',auth,lang,PageController.locations)
    router.get('/:lang/admin/locations/create',auth,lang,PageController.locationCreate)
    router.get('/:lang/admin/locations/edit/:id',auth,lang,PageController.locationEdit)

    router.get('/:lang/admin/users',auth,lang,PageController.users)
    router.get('/:lang/admin/users/create',auth,lang,PageController.userCreate)
    router.get('/:lang/admin/users/edit/:id',auth,lang,PageController.userEdit)

    router.get('/:lang/admin/roles',auth,lang,PageController.roles)
    router.get('/:lang/admin/roles/create',auth,lang,PageController.roleCreate)
    router.get('/:lang/admin/roles/edit/:id',auth,lang,PageController.roleEdit)

    router.get('/:lang/admin/profile',auth,lang,PageController.categories)
    router.get('/:lang/admin/settings',auth,lang,PageController.categories)

    router.get('/:lang/admin/products',auth,lang,PageController.products)
    router.get('/:lang/admin/products/create',auth,lang,PageController.productCreate)
    router.get('/:lang/admin/products/edit/:id',auth,lang,PageController.productEdit)
module.exports = router;