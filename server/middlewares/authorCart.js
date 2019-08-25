const Cart = require('../models/cart')

module.exports = (req, res, next) => {
    Cart.findOne({
        _id: req.params.id
    })
    .then(cart => {
        if (cart.user == req.decode.id) {
            next()
        }
        else {
            res.status(401).json("You are not authorized user")
        }
    })
    .catch(next)
}