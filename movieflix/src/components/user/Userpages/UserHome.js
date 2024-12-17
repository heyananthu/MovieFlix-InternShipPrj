import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import HomeMovieRow from './HomeMovieRow';
import UserNav from './UserNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserHome() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
        useEffect(() => {
            const userRole = localStorage.getItem("user_Id");
    
            if (!userRole) {
                alert("Unauthorized Access");
                navigate("/supportlogin");
            }
        }, [navigate]);

    useEffect(() => {
        axios
            .post(`http://localhost:5000/viewmovie?status=approved`)
            .then((res) => {
                const updatedMovies = res.data.map((movie) => ({
                    ...movie,
                    thumbnail: movie.thumbnail.replace(/\\/g, '/'), // Fix backslashes in paths
                }));
                setMovies(updatedMovies);
                console.log('Fetched movies:', updatedMovies);
            })
            .catch((err) => {
                console.error('Error fetching movies:', err);
            });
    }, []);

    const playHandler = (id) => {
        localStorage.setItem('movieid', id);
        navigate('/usermovieview');
    };

    const moreInfoHandler = (id) => {
        localStorage.setItem('moreinfomovie_id', id);
        navigate('/movieview');
    };

    const fallbackThumbnail = 'https://via.placeholder.com/1280x720?text=No+Image+Available'; // Placeholder image

    return (
        <div className="bg-black h-screen">
            <UserNav />

            {/* Swiper Component for Sliding Thumbnails */}
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    className="h-[60vh] md:h-[80vh] w-full"
                >
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <SwiperSlide key={movie._id} className="relative">
                                <img
                                    src={`http://localhost:5000/${movie.thumbnail}` || fallbackThumbnail}
                                    alt={movie.movie}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70"></div>
                                <div className="absolute bottom-10 px-4 md:px-8 text-white">
                                    <h1 className="text-4xl md:text-6xl font-bold">{movie.movie}</h1>
                                    <p className="text-sm md:text-lg mt-2 w-[25rem]">{movie.discription}</p>
                                    <div className="mt-4">
                                        <button
                                            className="bg-red-600 px-6 py-2 text-sm md:text-lg font-bold rounded hover:bg-red-700"
                                            onClick={() => {
                                                playHandler(movie._id);
                                            }}
                                        >
                                            Play
                                        </button>
                                        <button
                                            className="bg-gray-600 px-6 py-2 text-sm md:text-lg font-bold rounded ml-4 hover:bg-gray-700"
                                            onClick={() => {
                                                moreInfoHandler(movie._id);
                                            }}
                                        >
                                            More Info
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <p className="text-white text-center mt-8">No movies available at the moment.</p>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
            <HomeMovieRow />
        </div>
    );
}

export default UserHome;
