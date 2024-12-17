const { query } = require('express');
const Movie = require('../Schema/MovieAddschema');
const subscriptionSchema = require('../Schema/SubscriptionSchema')
const userSubscriptionSchema = require('../Schema/UserSubscriptionSchema')
// Controller to handle adding a movie
const addmovie = async (req, res) => {
    try {
        const { movie, genre, director, writter, language, rating, discription } = req.body;
        console.log(genre, language)

        // Validate required fields
        if (!movie || !genre || !director || !language || !rating || !discription || !req.files?.thumbnail || !req.files?.trailer || !req.files?.video) {
            return res.status(400).json({ message: 'All fields including thumbnail, trailer, and video are required.' });
        }

        // Extract file paths
        const thumbnail = req.files.thumbnail[0].path;
        const trailer = req.files.trailer[0].path;
        const video = req.files.video[0].path;

        // Create new movie document
        const newMovie = new Movie({
            movie,
            genre,
            director,
            writter,
            language,
            thumbnail,
            trailer,
            video,
            rating,
            discription,
        });

        // Save to database
        const savedMovie = await newMovie.save();

        res.status(201).json({ message: 'Movie added successfully', movie: savedMovie });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ message: 'Failed to add movie', error: process.env.NODE_ENV === 'development' ? error : undefined });
    }
};
const viewMovies = async (req, res) => {
    const { status, genre } = req.query;
    try {
        const query = {};
        if (status) query.status = status;
        if (genre) query.genre = genre;
        const movies = await Movie.find(query); // Replace `Movie` with your actual model
        res.status(200).json(movies); // Ensure that `res` is the correct response object
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Failed to fetch movies', error });
    }
};

const moviecount = (async (req, res) => {
    const moviecount = await Movie.countDocuments()
    res.json(moviecount)

})

const deleteMovie = (async (req, res) => {
    const { id } = req.params
    try {
        const deletemovie = await Movie.findByIdAndDelete(id)
        if (deletemovie) {
            res.status(200).json({ msg: "Movie deleted Successfully" })
        }
    } catch (err) {
        console.log(err)
    }
})


const addSubscription = (async (req, res) => {
    const { title, description, price } = req.body
    try {
        const newData = {
            title, description, price
        }
        const subscription = await subscriptionSchema.create(newData)
        if (subscription) {
            res.status(200).json({ msg: "Subscription Successfully" })
        } else {
            res.status(404).json({ msg: "Failed" })
        }
    } catch (err) {
        console.log("error on subscription adding")
    }
})

const viewSubscription = (async (req, res) => {
    const viewSubscription = await subscriptionSchema.find();
    if (viewSubscription) {
        res.json(viewSubscription)
    }
})

const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if there's an active subscription
        const activeSubscription = await userSubscriptionSchema.findOne({
            subscriptionId: id,
            isSubscribed: true,
        });

        if (activeSubscription) {
            // Respond with 400 for active subscriptions
            return res.status(400).json({ msg: "Cannot delete. Active subscriptions exist." });
        }

        // Delete the subscription
        const deletedSubscription = await subscriptionSchema.findByIdAndDelete(id);

        if (deletedSubscription) {
            return res.status(200).json({ msg: "Deleted Successfully" });
        } else {
            return res.status(404).json({ msg: "Subscription not found." });
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};


const getSubscription = async (req, res) => {
    const { subscriptionId } = req.params
    const subscription = await subscriptionSchema.findById(subscriptionId)
    console.log(subscription)
    if (subscription) {
        res.status(200).json(subscription)
    }
}

const subscriptioncount = async (req, res) => {
    const subscriptionCount = await subscriptionSchema.countDocuments();
    if (subscriptionCount) {
        res.status(200).json(subscriptionCount)
    } else {
        res.status(404).json({ msg: "Count is failed" })
    }
}

const findMovie = async (req, res) => {
    const { movieid } = req.params
    const movie = await Movie.findById(movieid);
    if (movie) {
        res.status(200).json(movie)
    }

}

const movieViewInfo = async (req, res) => {
    const { movieid } = req.params
    const findMovie = await Movie.findById(movieid)
    if (findMovie) {
        res.status(200).json(findMovie)
    } else {
        res.status(404).json({ msg: "Movie Not Found" })
    }
}

const approveMovie = async (req, res) => {
    const { id } = req.params
    const { status } = req.body;
    console.log(id)
    console.log(status)
    const approve = await Movie.findByIdAndUpdate(id, { status }, { new: true })
    console.log(approve)
    if (approve) {
        res.status(200).json(approve)
    } else {
        res.status(404).json({ msg: "Approval Failed" })
    }

}


const searchMovies = async (req, res) => {
    const { query } = req.query;

    try {
        const movies = await Movie.find({ movie: { $regex: query, $options: 'i' } });
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error searching movies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};






module.exports = {
    addmovie, viewMovies, moviecount, deleteMovie, addSubscription, viewSubscription, deleteSubscription, findMovie, approveMovie, getSubscription, movieViewInfo
    , searchMovies, subscriptioncount
};
