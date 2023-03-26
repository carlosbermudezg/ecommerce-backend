const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const productImgRouter = require('./productImg.router');
const routerCart = require('./cart.router');
const routerPurcharse = require('./purcharse.router');
const router = express.Router();

router.use('/users', routerUser)
router.use('/categorys', routerCategory)
router.use('/products', routerProduct)
router.use('/productsImg', productImgRouter)
router.use('/cart', routerCart)
router.use('/purcharse', routerPurcharse)

module.exports = router;