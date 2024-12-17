import React, { useState } from 'react'
import bgbanner from '../../assets/Netflix-Background.jpg'
import logoanim from '../../assets/logoanim.json'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'
import MovieFlixLogo from '../../assets/MovieFlix Logo.json'


function Adminlogin() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (e) => {
        e.preventDefault();
        if (name == "admin" && password == "admin123") {
            localStorage.setItem("admin", "adminmovieflix");
            navigate('/admindashboard')
        } else {
            alert("Invalid User details")
        }
    }
    return (
        <div className="h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgbanner})` }}>
            <div className='flex'>
                <div className='absolute md:left-[35rem]'>
                    <div className='md:ml-16'>
                        <Lottie animationData={MovieFlixLogo} className='md:w-36' />
                    </div>
                    <div className='md:mt-11 absolute md:top-14 md:left-[6rem] '>
                        <h1 className='text-red-600 md:text-sm md:font-bold'><span className='md:font-black md:text-xl'>M</span>ovie<span className='md:font-black md:text-xl'>F</span>lix</h1>
                    </div>
                </div>
            </div>
            <div className='mt-36'>
                <section class="md:h-80">
                    <div class="flex flex-col items-center justify-center ">
                        <div class="md:w-[50rem] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-black bg-opacity-50 dark:border-gray-500">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-red-500 text-center">
                                    Admin Login
                                </h1>
                                <form class="space-y-4 md:space-y-7" action="#">
                                    <div>
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">user name</label>
                                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user name" required=""
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <button type="submit" class="mt-5 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-primary-800" onClick={loginHandler}>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Adminlogin
