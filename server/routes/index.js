const router = require('express').Router()
const routerUser = require('../routes/user')
const routerProduct = require('../routes/product')
router.use('/user', routerUser)
router.use('/product', routerProduct)
module.exports = router