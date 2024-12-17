import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

function Usermovieview() {
    const movieid = localStorage.getItem("movieid");
    const userid = localStorage.getItem('user_Id'); // Ensure you are getting the user ID

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true); // To handle loading state

    useEffect(() => {
        console.log(movieid);
        if (!movieid || !userid) {
            toast.error("Movie ID or User ID is missing", {
                position: "top-center",
                autoClose: 5000,
            });
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/viewmovie/${movieid}/${userid}`)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    setMovie(res.data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching movie:", error);
                if (error.response && error.response.status === 403) {
                    // If the status is 403, the user is not subscribed
                    toast.error("You need to subscribe to view this movie.", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } else {
                    toast.error("Error fetching the movie. Please try again later.", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                setLoading(false);
            });
    }, [movieid, userid]);

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : movie ? (
                <video className="h-full w-full object-cover rounded-lg" controls>
                    <source src={`http://localhost:5000/${movie.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p className="text-white">Movie not found or unavailable.</p>
            )}

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    );
}

export default Usermovieview;

