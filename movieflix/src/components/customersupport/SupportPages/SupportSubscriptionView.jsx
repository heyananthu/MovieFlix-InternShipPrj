import React, { useState, useEffect } from 'react'
import SupportSideBar from './SupportSideBar'
import axios from 'axios'
import { motion } from "motion/react"

function SupportSubscriptionView() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [subscription, setSubscription] = useState([])

    const [successMessage, setSuccessMessage] = useState()


    const addHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/addsubscription", {
            title, description, price
        }).then((res) => {
            if (res.status == 200) {
                setSuccessMessage("Subscription Added Successfully")
                setTimeout(() => {
                    setSuccessMessage('')
                }, 1000)
            }
        })
        setTitle('')
        setDescription('')
        setPrice('')
    }

    useEffect(() => {
        axios.post("http://localhost:5000/viewsubscription")
            .then((res) => {
                setSubscription(res.data)
            })
    })
    const deleteHandler = (id) => {
        axios
            .delete(`http://localhost:5000/deletesubscription/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Deleted Successfully");
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        alert("It's an Active Subscription, so it can't be deleted.");
                    } else if (error.response.status === 404) {
                        alert("Subscription not found.");
                    }
                } else {
                    alert("An error occurred. Please try again.");
                }
            });
    };

    return (
        <div className='flex bg-slate-700'>
            <SupportSideBar />
            <div className='ml-[20rem] bg-slate-700 h-screen'>
                <h1 className='text-white text-center text-4xl'>Support Subscription</h1>
                <button className='bg-red-700 p-2 rounded-md text-white font-mono ml-[50rem]' onClick={(e) => document.getElementById('my_modal_1').showModal()}>Add subscription</button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box ">
                        <h1 className='font-mono text-xl text-white'>Add Subscription</h1>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            className="input input-bordered input-error w-full max-w-xs mt-4" />
                        <input
                            type="text"
                            placeholder="Discription"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            className="input input-bordered input-error w-full max-w-xs mt-3" />
                        <input
                            type="text"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                            className="input input-bordered input-error w-full max-w-xs mt-3" />
                        <div className="modal-action">
                            <form method="dialog ">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn bg-red-700" onClick={addHandler}>Add</button>
                                <button className="btn ml-2">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

                <div className='mt-12 grid grid-cols-3'>
                    {
                        subscription.map((obj) =>
                            <div className="card bg-slate-800 text-primary-content w-72 mt-10" key={obj._id}>
                                <div className="card-body text-white">
                                    <h2 className="card-title">{obj.title}</h2>
                                    <p>{obj.description}</p>
                                    <p className='text-3xl font-black font-mono'>₹{obj.price}</p>
                                    <div className="card-actions justify-end">
                                        {/* <button className="rounded p-2 bg-green-700 hover:bg-green-800 font-mono">₹{obj.price}</button> */}
                                        <button className="rounded p-2 bg-red-700 hover:bg-red-800 font-mono" onClick={() => { deleteHandler(obj._id) }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
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
                )
            }
        </div>
    )
}

export default SupportSubscriptionView
