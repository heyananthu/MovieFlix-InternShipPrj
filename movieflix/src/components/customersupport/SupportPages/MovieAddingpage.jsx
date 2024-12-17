import React, { useState } from 'react'
import SupportSideBar from './SupportSideBar'
import Moviepic from '../../../assets/movieaddpage.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

function MovieAddingpage() {
    const navigate = useNavigate();

    const [movie, setMovie] = useState()
    const [genre, setGenres] = useState("")
    const [director, setDirector] = useState()
    const [writter, setWritter] = useState()
    const [language, setLanguage] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [video, setVideo] = useState(null)
    const [rating, setRating] = useState()
    const [discription, setDiscription] = useState()

    const [loading, setLoading] = useState(false);  // State for managing loading

    const addHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading animation

        const formData = new FormData();
        formData.append("movie", movie);
        formData.append("genre", genre);
        formData.append("director", director);
        formData.append("writter", writter);
        formData.append("language", language);
        formData.append("thumbnail", thumbnail); // File
        formData.append("trailer", trailer); // File
        formData.append("video", video); // File
        formData.append("rating", rating);
        formData.append("discription", discription);

        try {
            const response = await axios.post("http://localhost:5000/addmovie", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Set proper headers for file upload
                },
            });

            toast.success('Movie Added Successfully', {
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

            setLoading(false); // Stop loading animation
            console.log("Movie added successfully:", response.data);
        } catch (error) {
            console.error("Error adding movie:", error.response?.data || error.message);
            setLoading(false); // Stop loading animation in case of error
        }
    };

    return (
        <div>
            <div className='flex bg-slate-700'>
                <SupportSideBar />
                <div className='ml-[20rem] bg-slate-700 h-screen'>
                    <div className='ml-12 mt-12 w-[22rem]  text-white font-mono'>
                        <h1 className='font-black text-4xl'>Add Movies</h1>
                        <p className='text-sm mt-5'>Help us expand our collection by adding favorite movies below.</p>
                        <img className='mt-4 rounded-xl opacity-70 shadow-md shadow-red-600' src={Moviepic} />
                    </div>
                    <div>
                        <div className='h-16'>
                            <section className="md:absolute md:top-12 md:left-[50rem]">
                                <div className="flex flex-col items-center justify-center ">
                                    <div className="md:w-[35rem] rounded-lg shadow dark:border md:mt-0 xl:p-0 bg-black bg-opacity-50 dark:border-gray-500">
                                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                            <form className="space-y-4 md:space-y-6 ml-1" onSubmit={addHandler}>
                                                <div className='flex gap-9'>
                                                    <div>
                                                        <input type="text" name="movie" id="movie" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="movie name" required
                                                            value={movie}
                                                            onChange={(e) => setMovie(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <select id="genres" name="genres" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={genre}
                                                            onChange={(e) => { setGenres(e.target.value) }}
                                                        >
                                                            <option value="" disabled>Select Genre</option>
                                                            <option value="Action">Action</option>
                                                            <option value="Comedy">Comedy</option>
                                                            <option value="Horror">Horror</option>
                                                            <option value="Romantic">Romantic</option>
                                                            <option value="Crime">Crime</option>
                                                            <option value="Science Fiction">Science Fiction</option>
                                                            <option value="Thriller">Thriller</option>
                                                            <option value="Drama">Drama</option>
                                                        </select >
                                                    </div>
                                                </div>
                                                <div className='flex gap-9'>
                                                    <div className=''>
                                                        <input type="text" name="director" id="director" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Director" required
                                                            value={director}
                                                            onChange={(e) => setDirector(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className=''>
                                                        <input type="text" name="writter" id="writter" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Script writter" required
                                                            value={writter}
                                                            onChange={(e) => setWritter(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex gap-9'>
                                                    <div className="mb-4">
                                                        <label
                                                            htmlFor="language"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Language
                                                        </label>
                                                        <select
                                                            id="language"
                                                            name="language"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={language}
                                                            onChange={(e) => setLanguage(e.target.value)}
                                                        >
                                                            <option value="" disabled>Select Language</option>
                                                            <option value="english">English</option>
                                                            <option value="malayalam">Malayalam</option>
                                                            <option value="hindi">Hindi</option>
                                                            <option value="kannada">Kannada</option>
                                                            <option value="tamil">Tamil</option>
                                                            <option value="korean">Korean</option>
                                                        </select>
                                                    </div>

                                                    <div className=''>
                                                        <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie Thumbnail</label>
                                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => { setThumbnail(e.target.files[0]) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex gap-9'>
                                                    <div className=''>
                                                        <label htmlFor="trailer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie Trailer</label>
                                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            type="file"
                                                            accept="trailer/*"
                                                            onChange={(e) => { setTrailer(e.target.files[0]) }}
                                                        />
                                                    </div>
                                                    <div className=''>
                                                        <label htmlFor="movievideo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Video</label>
                                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            type="file"
                                                            accept="video/*"
                                                            onChange={(e) => { setVideo(e.target.files[0]) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex gap-9'>
                                                    <div>
                                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IMDB Rating</label>
                                                        <input type="text" name="imdb" id="imdb" placeholder="imdb" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                                            value={rating}
                                                            onChange={(e) => { setRating(e.target.value) }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                        <input type="text" name="discription" id="discription" placeholder='Description' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[14rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                                            value={discription}
                                                            onChange={(e) => { setDiscription(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-primary-800">
                                                    {loading ? (
                                                        <span className="loading loading-spinner text-primary"></span>
                                                    ) : (
                                                        "Add Movie"
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
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

export default MovieAddingpage;
