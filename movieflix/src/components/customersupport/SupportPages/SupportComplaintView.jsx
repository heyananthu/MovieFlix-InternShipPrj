import React, { useEffect, useState } from 'react'
import SupportSideBar from './SupportSideBar'
import axios from 'axios'

function SupportComplaintView() {
    const [data, setData] = useState([]); // Initialize as an empty array
    const userid = localStorage.getItem('user_Id')


    useEffect(() => {
        axios.get(`http://localhost:5000/getusercomplaints/${userid}`)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data);
                    setData(res.data);
                }
            })
            .catch((err) => {
                console.error("Error fetching complaints:", err);
            });
    }, []);

    const deleteHandler = (id) => {
        try {
            axios.delete(`http://localhost:5000/usercomplaint/${id}`)
                .then((res) => {
                    if (res.status == 200) {
                        alert("Deleted Successfully")
                    } else {
                        alert("Deletion Failed")
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex bg-slate-700 '>
            <SupportSideBar />
            <div className='absolute left-[18rem] fill-slate-700 h-full w-[69rem] bg-slate-700'>
                <div>
                    <div className="overflow-x-auto w-full">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='font-black text-2xl text-white'>Name</th>
                                    <th className='font-black text-2xl text-white'>Email</th>
                                    <th className='font-black text-2xl text-white'>Phone</th>
                                    <th className='font-black text-2xl text-white'>Message</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((obj) => (
                                    <tr key={obj._id}>
                                        {/* <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th> */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={`http://localhost:5000/${obj.sender.img}`}
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{obj.sender.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {obj.sender.email}
                                            <br />
                                        </td>
                                        <td>{obj.sender.phone}</td>

                                        <td>{obj.message}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs hover:bg-red-700 " onClick={() => { deleteHandler(obj._id) }}>Delete</button>
                                        </th>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportComplaintView;
