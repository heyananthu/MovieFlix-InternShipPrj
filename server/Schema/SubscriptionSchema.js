const mongoose = require('mongoose')

const subscription = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },

}
    ,
    {
        timestamps: true
    }
)

const subscriptionSchema = mongoose.model("subscription", subscription)

module.exports = subscriptionSchema;