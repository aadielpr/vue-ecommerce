const router = require('express').Router()
const UserController = require('../controllers/UserController')
const Authentication = require('../middlewares/authen')
router.post('/', UserController.create)
router.post('/signIn', UserController.signIn)
router.post('/signInGoogle', UserController.googleSignIn)
router.post('/checkToken', Authentication, (req, res) => {
    res.status(200).json("Correct")
})

module.exports = router