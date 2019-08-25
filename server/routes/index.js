const router = require('express').Router()
const routerUser = require('../routes/user')
const routerProduct = require('../routes/product')
const routerCart = require('../routes/Cart')
router.use('/user', routerUser)
router.use('/product', routerProduct)
router.use('/cart', routerCart)
module.exports = router