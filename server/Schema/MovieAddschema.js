const mongoose = require('mongoose')
const newMovie = new mongoose.Schema({
    movie: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true,
    },
    director: {
        type: String,
        require: true
    },
    writter: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    trailer: {
        type: String
    },
    video: {
        type: String
    },
    rating: {
        type: String
    },
    discription: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
},
    {
        timestamps: true
    })

const movieSchema = mongoose.model("Movie", newMovie)

module.exports = movieSchema