import React, { useState } from 'react'
import bgbanner from '../../assets/Netflix-Background.jpg'
import logoanim from '../../assets/logoanim.json'
import Lottie from 'lottie-react'
import MovieAnimation from '../../assets/MovieAnimation.json'
import { PiFilmSlateFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import MovieFlixLogo from '../../assets/MovieFlix Logo.json'
function Landingpage() {
    const navigate = useNavigate();
    const siginHandler = () => {
        navigate('/userreg')
    }

    return (
        <div className="h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgbanner})` }}>
            <div className='flex'>
                <div className='flex sm:ml-14 md:whitespace-nowrap item-center'>
                    <div className='md:ml-16'>
                        <Lottie animationData={MovieFlixLogo} className='md:w-36' />
                    </div>
                    <div className='md:mt-11 absolute md:top-14 md:left-[9rem] ml-2'>
                        <h1 className='text-red-600 md:text-sm md:font-bold'><span className='md:font-black md:text-xl'>M</span>ovie<span className='md:font-black md:text-xl'>F</span>lix</h1>
                    </div>
                </div>
                <div className='md:ml-[56rem] md:mt-14 font-mono'>
                    <button className='bg-red-600 md:rounded md:p-2 text-white md:h-9 hover:bg-red-700' onClick={() => { navigate('/userlogin') }}>Sign In</button>
                </div>
            </div>
            <div className='md:ml-[24rem] md:mt-24'>
                <h1 className='md:font-black text-white md:text-6xl'>
                    Unlimited <span className='absolute md:top-52 mt-1 md:left-[41rem]' > <Lottie animationData={MovieAnimation} className='w-72' /> </span> <span className='ml-56'>,TV</span> <br /> <span className='md:ml-12'>shows and more</span><br />
                    <span className='md:text-lg md:ml-32'>
                        Starts at ₹149. Cancel at any time.
                    </span>
                </h1>
                <button className='bg-red-600  rounded p-3 md:w-32 text-white font-sans md:ml-56 md:mt-12 md:whitespace-nowrap flex items-center  hover:bg-red-800' onClick={siginHandler}>Get Started <PiFilmSlateFill className='ml-2' /></button>
            </div>
        </div>
    )
}
export default Landingpage
