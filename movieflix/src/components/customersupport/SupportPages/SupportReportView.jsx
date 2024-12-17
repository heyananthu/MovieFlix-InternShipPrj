import React from 'react'
import SupportSideBar from './SupportSideBar'
import SupportReportComplaint from './SupportReports/SupportReportComplaint'
import SupportReportMovies from './SupportReports/SupportReportMovies'
import SupportReportUser from './SupportReports/SupportReportUser'
import SupportReportSubscription from './SupportReports/SupportReportSubscription'
import SupportReportActiveSubscription from './SupportReports/SupportReportActiveSubscription'
function SupportReportView() {
    return (
        <div className='flex bg-slate-700 h-screen'>
            <SupportSideBar />
            <div className='flex-1 bg-slate-700 h-screen ml-[18rem]'>
                <h1 className='text-white text-center text-4xl font-black font-serif'>Reports</h1>
                <div className='grid grid-cols-3 gap-2 ml-6'>
                    <SupportReportUser />
                    <SupportReportMovies />
                    <SupportReportComplaint />
                    <SupportReportSubscription/>  
                    <SupportReportActiveSubscription/>  
                </div>
            </div>
        </div>
    )
}
export default SupportReportView
