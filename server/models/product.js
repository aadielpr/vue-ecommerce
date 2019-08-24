const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name should not be empty"]
    },
    price: {
        type: Number,
        required: [true, "Product price should not be empty"],
        min: [1, "Price should greater than 1"],
        validate: {
            validator: function(value) {
                if (typeof value !== 'number') {
                    return false
                }
                else {
                    return true
                }
            },
            message: "Price should only contain numeric"
        }
    },
    stock: {
        type: Number,
        required: [true, "Stock should not be empty"],
        min: [0, "Stock should not lower than 0"],
        validate: {
            validator: function (value) {
                if (typeof value !== 'number') {
                    return false
                }
                else {
                    return true
                }
            },
            message: "stock should only contain numeric"
        }
    },
    image: {
        type: String,
        required: [true, "Image cannot be empty"]
    },
    details: {
        type: String,
        required: [true, "Details can't be empty"]
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product