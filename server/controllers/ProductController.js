const Product = require('../models/product')

class ProductController {
    static create(req, res, next) {
        const { name, price, stock, image } = req.body;
        Product.create({
            name,
            price,
            stock,
            image
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }
}

module.exports = ProductController