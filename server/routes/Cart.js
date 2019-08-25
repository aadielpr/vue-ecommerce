const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const Authentication = require('../middlewares/authen');
const Authorization = require('../middlewares/authorCart')

router.use(Authentication)

router.post('/addToCart', CartController.addToCart)
router.get('/findUserCart', CartController.findUserCart)
router.post('/buyProduct', CartController.buyProduct)
router.get('/findUserTransaction', CartController.findUserTransaction)
router.delete('/deleteCart/:id', Authorization,CartController.deleteCart)

module.exports = router