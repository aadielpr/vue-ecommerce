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
            res.status(201).json(results)
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

    static destroy(req, res, next) {
        const id = req.params.id
        Product.findByIdAndDelete(id)
        .then(results => {
            let image_name = results.image.split('/')
            image_name = image_name[image_name.length - 1]
            req.file = image_name
            next()
        })
        .catch(next)
    }

    static update (req, res, next) {
        let obj = {}
        req.body.name && (obj.name = req.body.name)
        req.body.price && (obj.price = Number(req.body.price))
        req.body.stock && (obj.stock = Number(req.body.stock))
        req.body.image && (obj.image = req.body.image)
        req.body.details && (obj.details = req.body.details)
        Product.findByIdAndUpdate(req.params.id,obj,{
            new: true
        })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
    }
}

module.exports = ProductController