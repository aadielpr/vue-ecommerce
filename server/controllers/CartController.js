const Cart = require('../models/cart')
const Transaction = require('../models/transaction')
const Product = require('../models/product')

class CartController {
    static addToCart (req, res, next) {
        const userId = req.decode.id
        const { productId, quantity } = req.body
        Cart.findOne({
            product: productId,
            user: userId,
            status: false
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
            res.status(201).json(results)
        })
        .catch(next)

    }
    static findUserCart (req, res, next) {
        const userId = req.decode.id
        Cart.find({
            user: userId,
            status: false
        }).populate('user', '_id username email').populate('product', '-details')
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
        const cartId = req.params.id
        Cart.findByIdAndUpdate(cartId,{
            status: true
        })
        .then(results => {
            res.status(200).json("Update berhasil")
        })
        .catch(next)
    }
    
    static buyProduct (req, res, next) {
        const { userId, address, phoneNumber, zipCode } = req.body
        let promises = [];
        let totalPrice = 0;
        let arrayOfCart = [];
        Cart.find({
            user: userId,
            status: false
        }).populate('product')
        .then(results => {
            results.forEach((el) => { 
                if(el.product.stock < el.quantity) {
                    throw {
                        status: 400,
                        message: `Stock ketersediaan ${el.product.name} tidak cukup..`
                    }
                }
                else {
                    totalPrice += el.quantity * el.product.price 
                    arrayOfCart.push(el._id)
                }
            })
            return Transaction.create({
                user: userId,
                cart: arrayOfCart,
                phoneNumber,
                totalPrice,
                address,
                zipCode
            })
        })
        .then(created => {
            created.cart.forEach((el) => {
                let updateTrue = new Promise((resolve, reject) => {
                    Cart.findByIdAndUpdate(el._id,{
                        status: true
                    },{
                        new: true
                    })
                    .then(results => {
                        resolve(results)
                    })
                    .catch(err => {
                        reject(err)
                    })
                })
                promises.push(updateTrue)
            })
            return Promise.all(promises)
        })
        .then(results => {
            let arrayOfPromises = results.map((el) => {
                return new Promise((resolve, reject) => {
                    Product.findByIdAndUpdate(el.product,{
                        $inc: {
                            stock: -el.quantity
                        }
                    },{
                        new: true
                    })
                    .then(results => {
                        resolve(results)
                    })
                    .catch(err => {
                        reject(err)
                    })
                })
            })
            return Promise.all(arrayOfPromises)
        })
        .then(results => {
            res.status(201).json(results)
        })
        .catch(next)
    }

    static findUserTransaction (req, res, next) {
        Transaction.find({
            user: req.decode.id
        }).populate({
            path: 'cart',
            select: 'product quantity -_id',
            populate: {
                path: 'product',
                select: '-details -image -__v'
            }
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
    
}
module.exports = CartController