import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SupportSideBar from './SupportSideBar'
import { FaEye } from "react-icons/fa";
import { motion } from "motion/react"
function SupportUserView() {
    const [userlist, setUserList] = useState([]);
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/userview')
            .then((res) => {
                console.log(res.data)
                setUserList(res.data)
            })
    }, []);

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:5000/deleteuser/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    setSuccessMessage("Deleted Successfully")
                    setTimeout(() => {
                        setSuccessMessage('')
                    }, 1000)
                }
            })
    }
    return (
        <div className='flex bg-slate-700 h-full'>
            <SupportSideBar />
            <div className='ml-[19rem] w-full bg-slate-700 '>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th className='text-white font-black text-3xl'>Name</th>
                                <th className='text-white font-black text-3xl'>Email</th>
                                <th className='text-white font-black text-3xl'>Phone</th>
                                <th className='text-white font-black text-3xl'>Password</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userlist.map((obj) =>
                                <tr key={obj._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={`http://localhost:5000/${obj.img}`}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{obj.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{obj.email}
                                    </td>
                                    <td>{obj.phone}</td>
                                    <td>{obj.password}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs hover:bg-red-600" onClick={() => { deleteHandler(obj._id) }}>Delete</button>
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </table>
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

export default SupportUserView
