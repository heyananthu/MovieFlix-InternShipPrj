const mongoose = require('mongoose')

const newUser = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    createdAtcreatedAt: { type: Date, default: Date.now },
})
const userSchema = mongoose.model("user", newUser)

module.exports = userSchema