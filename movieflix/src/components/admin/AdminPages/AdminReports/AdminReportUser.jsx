import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chartBoxUser } from '../../../../data'
import axios from 'axios'
import Lottie from 'lottie-react'
import UserreportLogo from '../../../../assets/userreportlogo.json'
function AdminReportUser() {

    const [totalUser, setTotalUser] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/usercount')
            .then((res) => {
                setTotalUser(res.data)
            })
    }, [])

    return (
        <div>
            <div className='flex p-5  rounded-lg shadow-2xl shadow-slate-800  h-[10rem] w-[20rem] mt-24'>
                <div>
                    <h1 className='text-white font-black text-xl font-mono text-nowrap'>Total User</h1>
                    <h1 className='text-white font-black text-5xl font-mono mt-2'>{totalUser}</h1>
                    <Link to={'/adminuserview'} className='text-red-600 mt-6 block font-black text-lg font-mono'>view all</Link>
                </div>
                <div >
                    <Lottie animationData={UserreportLogo} className='w-28 ml-8' />
                </div>
            </div>
        </div>
    )
}

export default AdminReportUser
