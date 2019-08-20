const router = require('express').Router()
const routerUser = require('../routes/user')

router.use('/user', routerUser)

module.exports = router