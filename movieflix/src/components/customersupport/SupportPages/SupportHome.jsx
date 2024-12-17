import React, { useEffect } from 'react'
import SupportSideBar from './SupportSideBar'
import Lottie from 'lottie-react'
import supporthome from '../../../assets/supporthome.json'
import { useNavigate } from 'react-router-dom'
function SupportHome() {
    const navigate = useNavigate()
    useEffect(() => {
        const userRole = localStorage.getItem("support");

        if (userRole !== "movieflixsupport") {
            alert("Unauthorized Access");
            navigate("/supportlogin");
        }
    }, [navigate]);
    return (
        <div className='flex bg-slate-700 h-screen'>
            <SupportSideBar />
            <div className='ml-[19rem]'>
                <h1 className='text-slate-300 ml-12 text-5xl mt-16 font-black'>MovieFlix Customer Support</h1>
                <div className='flex'>
                    <div className='w-[30rem] ml-12 mt-24 text-left'>
                        <p className='text-white font-serif text-base'>
                            Welcome to the Support Dashboard of MovieFlix, your hub
                            for enriching our movie streaming platform. As a support
                            team member, you play a crucial role in adding and
                            managing movie titles, ensuring a diverse and engaging
                            library for our users. Use this dashboard to streamline
                            content updates, handle user feedback, and maintain the
                            highest standards of service. Your dedication and
                            expertise help make Movieflix a preferred destination
                            for movie lovers worldwide. Thank you for your
                            invaluable contribution to our community.
                        </p>
                    </div>
                    <div>
                        <Lottie animationData={supporthome} className='md:w-[35rem] md:absolute md:top-12' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupportHome
