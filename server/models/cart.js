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
        type: Number,
        required: [true, "quantity can't be empty"],
        min: [1, "At least 1 quantity to add to your Cart"]
    },
    status: {
        type: Boolean,
        default: false
    }
},{
    versionKey: false,
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart