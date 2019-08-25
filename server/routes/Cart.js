const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const Authentication = require('../middlewares/authen');

router.use(Authentication)
router.post('/addToCart', CartController.addToCart)
router.get('/findUserCart', CartController.findUserCart)
router.put('/checkOut', CartController.checkOut)
router.delete('/deleteCart/:id', CartController.deleteCart)

module.exports = router