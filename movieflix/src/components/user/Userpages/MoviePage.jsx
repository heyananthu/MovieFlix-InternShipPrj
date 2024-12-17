import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MoviePage() {
    const navigate = useNavigate();
    const movieid = localStorage.getItem("moreinfomovie_id");
    const [movie, setMovie] = useState({});
    const [videoError, setVideoError] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        // Fetch movie data on page load
        axios
            .get(`http://localhost:5000/viewmovieinfo/${movieid}`)
            .then((res) => {
                if (res.status === 200) {
                    setMovie(res.data);
                    setVideoError(false); // Reset video error if data fetch is successful
                    setIsLoading(false); // Set loading to false when data is fetched
                }
            })
            .catch((err) => {
                console.error("Error fetching movie data:", err);
                setVideoError(true);
                setIsLoading(false); // Set loading to false even if there's an error
            });
    }, [movieid]);

    const handleVideoError = () => {
        console.error("Error loading video");
        setVideoError(true);
    };

    const playHandler = (id) => {
        localStorage.setItem('movieid', id);
        navigate('/usermovieview');
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full w-full bg-black text-white">
                        <p>Loading...</p>
                    </div>
                ) : movie.trailer && !videoError ? (
                    <video
                        className="h-full w-full object-cover brightness-50"
                        controls
                        autoPlay
                        onError={handleVideoError}
                    >
                        <source src={`http://localhost:5000/${movie.trailer}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="flex items-center justify-center h-full w-full bg-black text-white">
                        <p>Video not available</p>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-10 z-10 text-white">
                <h1 className="text-7xl font-black text-red-500">
                    {movie.movie || "Loading..."}
                </h1>
                <p className="mt-8 text-lg w-[28rem]">
                    {movie.discription || "Description not available"}
                </p>
                <p className="mt-8 text-lg">Director: {movie.director || "Unknown"}</p>
                <p className="mt-4 text-lg">{movie.rating || "N/A"} | {movie.language || "N/A" }| {movie.genre || "N/A"}</p>
                <button
                    className="bg-white text-black p-3 w-36 mt-7 rounded-xl shadow-lg opacity-50"
                    onClick={() => {
                        playHandler(movie._id);
                    }}
                >
                    Play
                </button>
            </div>
        </div>
    );
}

export default MoviePage;
