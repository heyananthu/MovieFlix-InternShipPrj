import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
function AdminUserView() {
    const [userlist, setUserList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/userview')
            .then((res) => {
                const result = res.data
                console.log(result)
                setUserList(result)
            })
    }, []);

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:5000/deleteuser/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    toast.error('User Successfully Deleted', {
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
    }

    return (
        <div className='flex bg-slate-700 h-full'>
            <AdminSidebar />
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
                                                {/* <div className="text-sm opacity-50">United States</div> */}
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

export default AdminUserView;