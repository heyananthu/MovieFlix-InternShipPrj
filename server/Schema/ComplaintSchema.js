const mongoose = require('mongoose')
const complaints = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    email: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    createdAtcreatedAt: { type: Date, default: Date.now },
}
)

const compaintSchema = mongoose.model("complaint", complaints)

module.exports = compaintSchema;