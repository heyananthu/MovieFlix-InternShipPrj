import React,{useEffect} from 'react'
import AdminSidebar from './AdminSidebar'
import Lottie from 'lottie-react'
import adminhome from '../../../assets/adminhome.json'
import { useNavigate } from 'react-router-dom'
function AdminHome() {
const navigate = useNavigate()
        useEffect(() => {
            const userRole = localStorage.getItem("admin");
    
            if (userRole !== "adminmovieflix") {
                alert("Unauthorized Access");
                navigate("/adminlogin");
            }
        }, [navigate]);
    return (
        <div className='flex bg-slate-700'>
            <AdminSidebar />
            <div className='flex-1 bg-slate-700 h-screen ml-[18rem]'>
                <h1 className='text-slate-300 ml-12 text-5xl mt-16 font-black'>MovieFlix Admin Dashboard</h1>
                <div className='flex'>
                    <div className='w-[30rem] ml-12 mt-24 text-left'>
                        <p className='text-white font-serif text-base'>
                            Welcome to the Admin Dashboard of MovieFlix, your
                            ultimate movie streaming platform. Here, as an
                            administrator, you have the power to manage users,
                            oversee platform settings, and ensure smooth operations.
                            Use this dashboard to monitor user activities, handle
                            support requests, and maintain the overall quality and
                            security of our service. Your role is essential in
                            providing an exceptional streaming experience for all
                            users. Thank you for your commitment and
                            leadership in making MovieFlix a top choice for movie
                            enthusiasts everywhere.
                        </p>
                    </div>
                    <div>
                        <Lottie animationData={adminhome} className='w-[25rem] ml-32'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome
