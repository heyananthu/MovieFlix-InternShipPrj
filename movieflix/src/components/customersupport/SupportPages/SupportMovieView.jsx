import React, { useState, useEffect } from 'react';
import SupportSideBar from './SupportSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { motion } from "motion/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
function SupportMovieView() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]); // Initialize as an array

    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        axios.post("http://localhost:5000/viewmovie")
            .then((res) => {
                setMovies(res.data); // Store the array of movies
                console.log(res.data);
            })
            .catch((err) => console.error('Error fetching movies:', err));

    }, []);

    const movieDeleteHandler = (id) => {
        axios.delete(`http://localhost:5000/deletemovie/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    toast.error('Movie Deleted', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
            })
    }
    const movieView = (id) => {
        localStorage.setItem('moreinfomovie_id', id);
        navigate('/movieview');
    }
    return (
        <div className="flex bg-slate-700 h-screen">
            <SupportSideBar />
            <div className="absolute left-[18rem] w-[68rem] bg-slate-700 ">
                {/* <h1 className="text-white text-center text-4xl">Support Movies</h1> */}
                <button
                    className="bg-red-600 hover:bg-red-700 p-2 rounded text-white mt-6 ml-[58rem]"
                    onClick={() => { navigate('/movieadd'); }}
                >
                    Add Movies
                </button>
                <div className="grid grid-cols-3 p-3">
                    {movies.map((movie) => (
                        <div
                            key={movie._id}
                            className="card card-compact bg-base-100 w-72 shadow-md shadow-red-900 mt-5"
                        >
                            <figure>
                                <img className='w-full h-56 bg-cover bg-center p-1'
                                    src={`http://localhost:5000/${movie.thumbnail}`} // Dynamically load thumbnails
                                    alt={movie.movie}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{movie.movie}</h2>
                                {/* <p>{movie.discription}</p> */}
                                <div className="card-actions ">
                                    <button className="btn bg-green-600 w-48 text-white" onClick={() => { movieView(movie._id) }}>▶️Watch Now</button>
                                    <MdDelete className='bg-red-600 p-3 ml-2 rounded-full cursor-pointer hover:bg-red-700' size={45} onClick={() => { movieDeleteHandler(movie._id) }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                successMessage && (

                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        role="alert" className="alert alert-success absolute w-96 px-20 text-nowrap left-[40rem] mt-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current "
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{successMessage}</span>
                    </motion.div>
                )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce} />
        </div>
    );
}

export default SupportMovieView;
