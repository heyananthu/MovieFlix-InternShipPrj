import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgbanner from '../../assets/Netflix-Background.jpg';
import logoanim from '../../assets/logoanim.json';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

function UserLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/userlogin', {
                email,
                password,
            });

            const result = response.data;
            if (result.status === 'success') {
                localStorage.setItem('user_Id', result.userId);
                toast.success('Login Successful!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Bounce,
                    autoClose: 5000,
                    // onClose: () => navigate('/userhome'),
                });
                setTimeout(() => {
                    navigate('/userhome');
                }, 1000);
            }
            if (result.status === 404) {
                toast.error(result.message || 'User not found', {
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
        } catch (err) {
            console.error('Login error:', err);
            toast.error('An error occurred. Please try again.', {
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
    };

    return (
        <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgbanner})` }}>
            <div className="flex">
                <div className="flex sm:ml-14 md:whitespace-nowrap items-center">
                    <div className="md:ml-2">
                        <Lottie animationData={logoanim} className="md:w-32" />
                    </div>
                    <div className="md:mt-11">
                        <h1 className="text-red-600 md:text-4xl md:font-bold">
                            <span className="md:font-black md:text-5xl">M</span>ovie
                            <span className="md:font-black md:text-5xl">F</span>lix
                        </h1>
                    </div>
                </div>
                <div className="md:ml-[45rem] md:mt-14 font-mono">
                    <button
                        className="bg-red-600 md:rounded md:p-2 text-white md:h-9 hover:bg-red-700"
                        onClick={() => navigate('/')}
                    >
                        Sign In
                    </button>
                </div>
            </div>

            <div>
                <section className="md:h-80">
                    <div className="flex flex-col items-center justify-center">
                        <div className="md:w-[50rem] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-black bg-opacity-50 dark:border-gray-500">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-red-500 text-center">
                                    Login
                                </h1>
                                <form className="space-y-4 md:space-y-7" onSubmit={loginHandler}>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                                    >
                                        Log in
                                    </button>

                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don't have an account?{' '}
                                        <span
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                                            onClick={() => navigate('/userreg')}
                                        >
                                            Register here
                                        </span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
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
                pauseOnHoverx
                theme="colored"
                transition={Bounce}
            />
        </div>
    );
}

export default UserLogin;
