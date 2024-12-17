import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import Movieicon from '../../../assets/MovieFlix Logo.json';
import bgbanner from '../../../assets/Netflix-Background.jpg';

function UserProfile() {
    const [user, setUser] = useState({});
    const [subscriptionDetails, setSubscriptionDetails] = useState([]); // Update: single subscription
    const userId = localStorage.getItem("user_Id");

    // Fetch user profile
    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/userprofile/${userId}`)
                .then((res) => {
                    setUser(res.data.user);
                })
                .catch((err) => {
                    console.error('Error fetching user profile:', err);
                    alert('There was an error fetching your profile. Please try again later.');
                });
        } else {
            alert('No user ID found in local storage.');
        }
    }, [userId]);

    // Fetch subscription details
    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/usersubscriptiondetails/${userId}`)
                .then((res) => {
                    if (res.status === 200) {
                        console.log("Subscription Details:", res.data);
                        setSubscriptionDetails(res.data); // Update: single subscription object
                    }
                })
                .catch((err) => {
                    console.error('Error fetching subscription details:', err);
                });
        }
    }, [userId]);

    return (
        <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgbanner})` }}>
            <div className="flex">
                <div className="w-[30rem] ml-40">
                    <Lottie animationData={Movieicon} />
                    <h1 className="text-red-600 font-black absolute left-[17rem] top-[22rem] text-5xl font-serif">MovieFlix</h1>
                </div>
                <div className="ml-44">
                    <div className="flex items-center h-screen w-full justify-center">
                        <div className="max-w-xs">
                            <div className="bg-black opacity-75 shadow-xl rounded-lg py-3 w-[30rem] h-[33rem]">
                                <div className="photo-wrapper p-2">
                                    <img
                                        className="w-44 h-44 rounded-full mx-auto bg-cover bg-center"
                                        src={user.img ? `http://localhost:5000/${user.img}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt={user.name || 'User'}
                                    />
                                </div>
                                <div className="p-2">
                                    <h3 className="text-center text-xl text-white font-medium leading-8">
                                        {user.name || 'Loading...'}
                                    </h3>
                                    <table className="text-xs my-3 mt-12 ml-32">
                                        <tbody>
                                            <tr>
                                                <td className="px-2 py-2 text-white font-black">Email:</td>
                                                <td className="px-2 py-2 text-white font-bold">{user.email || 'Loading...'}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-white font-black">Phone:</td>
                                                <td className="px-2 py-2 text-white font-bold">{user.phone || 'Loading...'}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 py-2 text-white font-black">Subscription:</td>
                                                <td className="px-2 py-2 text-white font-bold">
                                                    {subscriptionDetails && subscriptionDetails.subscriptionId ? (
                                                        <div className='bg-green-700 rounded p-3 text-center'>
                                                            <div>{subscriptionDetails.subscriptionId.title || 'No Title'}</div>
                                                            <div>{subscriptionDetails.subscriptionId.description || 'No Description'}</div>
                                                            <div>{subscriptionDetails.subscriptionId.price || 'No Price'}</div>
                                                        </div >
                                                    ) : (
                                                        'No active subscription found.'
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="text-center my-3 mt-">
                                        {/* <button className="bg-green-600 rounded-lg p-2 w-[10rem] text-white hover:bg-green-800">
                                            Edit Profile
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
