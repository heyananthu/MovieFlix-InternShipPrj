import React,{useEffect ,useState} from 'react'
import { Link } from 'react-router-dom';
import complaintreportlogo from '../../../../assets/complaintsreportlogo.json'
import Lottie from 'lottie-react';
import axios from 'axios'
function SupportReportComplaint() {
    const [count, setCount] = useState();

    useEffect(() => {
        axios.post("http://localhost:5000/complaintcount")
            .then((res) => {
                setCount(res.data)
            })

    }, [])
    return (
        <div>
            <div className='flex p-5  rounded-lg shadow-2xl shadow-slate-800  h-[10rem] w-[20rem]  mt-24'>
                <div>
                    <h1 className='text-white font-black text-xl font-mono'>Complaints</h1>
                    <h1 className='text-white font-black text-5xl font-mono mt-2'>{count}</h1>
                    <Link to={'/supportcomplaintview'} className='text-red-600 mt-6 block font-black text-lg font-mono'>view all</Link>
                </div>
                <div className='h-full w-full ml-12'>
                    <Lottie animationData={complaintreportlogo} />
                </div>
            </div>
        </div>
    )
}

export default SupportReportComplaint
