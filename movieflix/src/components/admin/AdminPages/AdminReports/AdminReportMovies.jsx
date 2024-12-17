import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import adminhome from '../../../../assets/adminhome.json'
import axios from 'axios'
function AdminReportMovies() {
    const [count, setCount] = useState()
    useEffect(() => {
        axios.post("http://localhost:5000/moviecount")
            .then((res) => {
                setCount(res.data)
            })
    }, [])
    return (
        <div>
            <div className='flex p-5 rounded-lg shadow-2xl shadow-slate-800  h-[10rem] w-[20rem] mt-24'>
                <div>
                    <h1 className='text-white font-black text-xl font-mono'>Movies</h1>
                    <h1 className='text-white font-black text-5xl font-mono mt-2'>{count}</h1>
                    <Link to={'/adminmovieview'} className='text-red-600 mt-6 block font-black text-lg font-mono text-nowrap'>view all</Link>
                </div>
                <div className='h-full w-full ml-12'>
                    <Lottie animationData={adminhome} className='w-32 ml-8' />
                </div>
            </div>
        </div>
    )
}

export default AdminReportMovies
