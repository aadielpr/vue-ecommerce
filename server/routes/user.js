const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/', UserController.create)
router.post('/signIn', UserController.signIn)
module.exports = router