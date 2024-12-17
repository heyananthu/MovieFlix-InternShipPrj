const mongoose = require('mongoose')

const userSubscription = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subscription",
        required: true,
    },
    isSubscribed: {
        type: Boolean,
        // enum: ['true', 'false'],
        default: false,
    },
    subscriptionDate: {
        type: Date,
        default: Date.now,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },

}, { timestamps: true })

module.exports = mongoose.model("usersubscription", userSubscription)