import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import subscriptionAnim from '../../../../assets/subscriptionAnimation.json'
import Lottie from 'lottie-react';
import axios from 'axios'

function SupportReportActiveSubscription() {
    const [count, setCount] = useState()
    useEffect(() => {
        axios.post("http://localhost:5000/activeSubscription")
            .then((res) => {
                setCount(res.data)
            })
    }, [])
    return (
        <div>
            <div className='flex p-5 rounded-lg shadow-2xl shadow-slate-800  h-[10rem] w-[20rem] mt-24'>
                <div>
                    <h1 className='text-white font-black text-xl font-mono text-nowrap'>Active Subscriptions</h1>
                    <h1 className='text-white font-black text-5xl font-mono mt-2'>{count}</h1>
                    {/* <Link to={'/supportmovieview'} className='text-red-600 mt-6 block font-black text-lg font-mono text-nowrap'>view all</Link> */}
                </div>
                <div className='h-full w-full'>
                    <Lottie animationData={subscriptionAnim} className='w-20 mt-7 ' />
                </div>
            </div>
        </div>
    )
}

export default SupportReportActiveSubscription
