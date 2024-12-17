import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminReportUser from './AdminReports/AdminReportUser'
import AdminReportMovies from './AdminReports/AdminReportMovies'
import AdminReportComplaints from './AdminReports/AdminReportComplaints'
import AdminReportActiveSubscription from './AdminReports/AdminReportActiveSubscription'
import AdminReportSubscription from './AdminReports/AdminReportSubscription'

function AdminReportView() {
    return (
        <div className='flex'>
            <AdminSidebar />
            <div className='flex-1 bg-slate-700 h-screen ml-[18rem]'>
                <h1 className='text-white text-center text-4xl font-black font-serif'>Reports</h1>
                <div className='grid grid-cols-3 gap-2 ml-6'>
                    <AdminReportUser />
                    <AdminReportMovies />
                    <AdminReportComplaints />
                    <AdminReportSubscription />
                    <AdminReportActiveSubscription />
                </div>
            </div>
        </div>
    )
}

export default AdminReportView
