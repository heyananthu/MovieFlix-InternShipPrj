import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SecondMovieRow from "./SecondMovieRow";
import UserFooter from "./UserFooter";
function NextArrow(props) {
    const { className, onClick } = props;
    

    return (
        <button
            className={`${className} text-white bg-gray-800 hover:bg-gray-700 p-3 rounded-full`}
            onClick={onClick}
        >
            &#8250;
        </button>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <button
            className={`${className} text-white bg-gray-800 hover:bg-gray-700 p-3 rounded-full`}
            onClick={onClick}
        >
            &#8249;
        </button>
    );
}


function HomeMovieRow({ title }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 6,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 5 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } },
        ],
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.post(`http://localhost:5000/viewmovie?status=approved`);
                const uniqueMovies = Array.from(
                    new Map(
                        res.data.map((movie) => [
                            movie._id,
                            {
                                ...movie,
                                thumbnail: movie.thumbnail.replace(/\\/g, "/"), // Normalize file paths
                            },
                        ])
                    ).values()
                );

                setMovies(uniqueMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div className="text-white text-center">Loading...</div>;
    }

    const selectHandler = (id) => {
        localStorage.setItem('moreinfomovie_id', id);
        navigate('/movieview');

    }

    return (
        <div className="movie-row mb-8 px-4 md:px-8 bg-black">
            <h2 className="text-5xl font-bold  mb-4 font-sans mt-8 ml-3">Newly Added</h2>
            <Slider {...settings} className="movie-slider">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={`movie-${movie._id}`} className="p-2 cursor-pointer" onClick={() => { selectHandler(movie._id) }}>
                            <img
                                src={`http://localhost:5000/${movie.thumbnail}`}
                                alt={movie.movie}
                                className="rounded-lg w-full h-64 object-cover"
                            />
                            {/* <h1 className=" font-sans font-black text-xl mt-2">{movie.movie}</h1> */}
                        </div>
                    ))
                ) : (
                    <div className="text-white text-center">No movies available</div>
                )}
            </Slider>
            <SecondMovieRow/>
            <UserFooter className="w-full"/>
        </div>
    );
}

export default HomeMovieRow;
