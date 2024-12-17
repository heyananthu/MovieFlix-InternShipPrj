import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar'
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
function AdminMoviesView() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios.post("http://localhost:5000/viewmovie?status=approved")
            .then((res) => {
                setMovies(res.data)
            })

    })

    const movieDeleteHandler = (id) => {
        axios.delete(`http://localhost:5000/deletemovie/${id}`)

            .then((res) => {
                console.log(res.status)
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
        <div className='flex bg-slate-700 h-full'>
            <AdminSidebar />
            <div className='flex-1  bg-slate-700  ml-[18rem] '>
                <h1 className='text-white text-center text-4xl'>Movies</h1>
                <div>
                    <div className="grid grid-cols-3 p-3">
                        {movies.map((movie) => (
                            <div
                                key={movie._id}
                                className="card card-compact bg-base-100 w-72 shadow-md shadow-red-900 mt-5 "
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
                                        <button className="btn bg-green-600 w-48 text-white"                                
                                         onClick={() => { movieView(movie._id) }}
                                        >▶️Watch Now</button>
                                        <MdDelete className='bg-red-600 p-3 ml-2 rounded-full cursor-pointer hover:bg-red-700' size={45} onClick={() => { movieDeleteHandler(movie._id) }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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
    )
}

export default AdminMoviesView
