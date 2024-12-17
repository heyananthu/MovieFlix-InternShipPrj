import React, { useState, useEffect } from 'react'
import bgbanner from '../../../assets/Netflix-Background.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
function UserSubscriptionView() {
    const navigate = useNavigate()
    const [subscription, setSubscription] = useState([])
    const userId = localStorage.getItem('user_Id')
    useEffect(() => {
        axios.post("http://localhost:5000/viewsubscription")
            .then((res) => {
                setSubscription(res.data)
            })
    })
    const chooseHandler = (id) => {
        localStorage.setItem("subscriptionId", id)
        navigate('/userpayment')

    }

    useEffect(() => {
        console.log("userId:", userId); // Debug userId
        if (!userId) {

            return;
        }

        axios.get(`http://localhost:5000/subscriptioncheck/${userId}`)
            .then((res) => {
                console.log("checksubscriptionres", res.data);

                if (res.data.msg === 'User has an active subscription.') {
                    toast.info('You have already an Active Subscription', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else if (res.data.msg === 'User does not have an active subscription.') {
                    toast.info('You have No Active Subscription', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    // Handle case for missing subscription
                    toast.warn('No subscription record found for this user', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
            })
            .catch((err) => {
                console.error("Error details:", err);
                toast.error('No Active Subscription', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            });
    }, []);


    return (
        <div className="h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgbanner})` }}>
            <div className='absolute left-36 top-[5rem] grid grid-cols-3 gap-12'>
                {
                    subscription.map((obj) =>
                        <div className="card bg-slate-800 text-primary-content w-72 mt-10" key={obj._id}>
                            <div className="card-body text-white">
                                <h2 className="card-title">{obj.title}</h2>
                                <p>{obj.description}</p>
                                <p className='text-3xl font-black font-mono'>₹{obj.price}</p>
                                <div className="card-actions justify-start">
                                    <button className="rounded p-2 w-[6rem] bg-green-700 hover:bg-green-800 font-mono" onClick={() => { chooseHandler(obj._id) }}>Buy</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
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
                transition={Bounce} />
        </div>
    )
}

export default UserSubscriptionView
