const Cart = require('../models/cart')
const verify = require('../helpers/jwt').verify

class CartController {
    static addToCart (req, res, next) {
        const userId = req.decode.id
        const { productId, quantity } = req.body
        Cart.findOne({
            product: productId,
            user: userId
        })
        .then(results => {
            if(results) {
                return Cart.findOneAndUpdate({
                    _id: results._id
                },{
                    $inc: {
                        quantity: quantity
                    }
                },{
                    new: true
                })
            }
            else {
                return Cart.create({
                    user: userId,
                    product: productId,
                    quantity: quantity
                })
            }
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)

    }
    static findUserCart (req, res, next) {
        const userId = req.decode.id
        Cart.find({
            user: userId,
            status: false
        }).populate('user', 'username email').populate('product', '-details')
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }

    static deleteCart (req, res, next) {
        const cartId = req.params.id;
        Cart.findByIdAndDelete(cartId)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
    
    static checkOut (req, res, next) {
        const cartId = req.body.cartId
        Cart.findByIdAndUpdate(cartId,{
            status: true
        })
        .then(results => {
            res.status(200).json("Update berhasil")
        })
        .catch(next)
    }
    
}
module.exports = CartController