const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    address: {
        type: String,
        required: [true, "address should be fill"]
    },
    phoneNumber: {
        type: String,
        required: [true, "user phone number is require"],
        match: [/^[0-9]*$/g, "Phone number should contain only numeric"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price should not be empty"],
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
    }
},{
    versionKey: false,
    timestamps: true
})

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction