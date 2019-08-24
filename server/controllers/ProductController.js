const Product = require('../models/product')

class ProductController {
    static create(req, res, next) {
        const { name, price, stock, image, details } = req.body;
        Product.create({
            name,
            price: Number(price),
            stock: Number(stock),
            image,
            details
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
    static loadProduct(req, res, next) {
        Product.find()
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
    static findOne(req, res, next) {
        Product.findById(req.params.id)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
}

module.exports = ProductController