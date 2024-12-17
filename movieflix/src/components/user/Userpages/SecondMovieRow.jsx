import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SecondMovieRow() {
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const genres = ["Action", "Thriller", "Comedy", "Drama", "Romantic", "Horror","Crime" , "Science Fiction"];
    const navigate = useNavigate();

    useEffect(() => {
        genres.forEach((genre) => {
            axios
                .post(`http://localhost:5000/viewmovie?status=approved&genre=${genre}`)
                .then((res) => {
                    setMoviesByGenre((prev) => ({ ...prev, [genre]: res.data }));
                })
                .catch((error) => {
                    console.error(`Error fetching ${genre} movies:`, error);
                });
        });
    }, []);

    const selectHandler = (id) => {
        localStorage.setItem("moreinfomovie_id", id);
        navigate("/movieview");
    };

    return (
        <div>
            {genres.map((genre) => (
                moviesByGenre[genre]?.length > 0 && (
                    <div className="movie-row mb-8 px-4 md:px-8 bg-black" key={genre}>
                        <h2 className="text-5xl font-bold mb-4 font-sans mt-8 ml-3">{genre}</h2>
                        <div className="rounded-box flex gap-6">
                            {moviesByGenre[genre].map((movie) => (
                                <div className="carousel-item" key={movie._id}>
                                    <img
                                        src={`http://localhost:5000/${movie.thumbnail}`}
                                        alt={movie.movie}
                                        className="rounded-lg w-[14rem] h-64 object-cover cursor-pointer"
                                        onClick={() => selectHandler(movie._id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

export default SecondMovieRow;
