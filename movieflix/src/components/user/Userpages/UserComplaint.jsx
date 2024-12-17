import React, { useState } from 'react'
import bgbanner from '../../../assets/Netflix-Background.jpg';
import Lottie from 'lottie-react';
import Movieicon from '../../../assets/MovieFlix Logo.json';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';


function UserComplaint() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [message, setMessage] = useState()
    // const [successMessage, setSuccessMessage] = useState('')
    // const [errorMessage, setErrorMessage] = useState('')
    let userId = localStorage.getItem("user_Id")

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/usercomplaint", {
            name, email, message, userId
        }).then((res) => {
            try {
                const result = res.data
                console.log(result)
                if (res.status === 201) {
                    toast.success('Complaint Send Successfully', {
                        position: "top-center",
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
                if (res.status === 400) {
                    toast.error('Complaint Failed', {
                        position: "top-center",
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
            } catch (err) {

            }
        })
        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <div className='h-screen fixed w-full bg-cover bg-center' style={{ backgroundImage: `url(${bgbanner})` }}>
            <div className='flex grid-cols-3'>
                <div className='w-[20rem] ml-16'>
                    <Lottie animationData={Movieicon} className='mt-16 ml-8 w-[24rem]' />
                    <h1 className='text-red-600 font-black absolute left-[10rem] top-[22rem] text-5xl font-serif'>MovieFlix</h1>
                </div>
                <div className='ml-[20rem] mt-12'>
                    <div class="w-full md:w-[38rem] md:max-w-full mx-auto">
                        <div class="p-6 border border-gray-600 sm:rounded-xl bg-gray-800 bg-opacity-95">
                            <form>
                                <label class="block mb-6">
                                </label>
                                <label class="block mb-6">
                                    <span class="text-gray-300">What's wrong?</span>
                                    <textarea
                                        name="message"
                                        value={message}
                                        onChange={(e) => { setMessage(e.target.value) }}
                                        class="
            block
            w-full
            h-80 
            p-2
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
          "
                                        rows="3"
                                        placeholder="Please describe your problem"
                                    ></textarea>
                                </label>
                                <div class="mb-6">
                                    <button onClick={submitHandler}
                                        type="submit"
                                        class="h-10
            px-5
            text-indigo-100
            bg-red-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-red-800
          "
                                    >
                                        send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
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

export default UserComplaint
