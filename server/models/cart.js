const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number
    }
},{
    versionKey: false,
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart