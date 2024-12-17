import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import axios from 'axios'
function AdminSubscription() {
    const [subscription, setSubscription] = useState([])

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
            <AdminSidebar />
            <div className='flex-1  bg-slate-700 h-screen ml-[20rem]'>
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
        </div>
    )
}

export default AdminSubscription
