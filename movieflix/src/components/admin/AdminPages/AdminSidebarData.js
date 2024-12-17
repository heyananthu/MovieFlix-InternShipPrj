import React from 'react'
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { BiMessageError } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";
import { LuMessageCirclePlus } from "react-icons/lu";
import { BiSolidMoviePlay } from "react-icons/bi";
export const AdminSidebarData = (logoutHandler)=> [
    {
        title: "Home",
        icon: <IoMdHome size={30} />,
        link: "/admindashboard"
    },
    {
        title: "Reports",
        icon: <TbReportSearch size={30} />,
        link: "/adminreportview"
    },
    {
        title: "Users",
        icon: <FaUsers size={30} />,
        link: "/adminuserview"
    },
    {
        title: "Movies",
        icon: <MdLocalMovies size={30} />,
        subItem: [
            {
                title: "Movie Request",
                icon: <LuMessageCirclePlus size={25} />,
                link: "/adminrequestview",
            },
            {
                title: "View Movies",
                icon: <BiSolidMoviePlay size={25} />,
                link: "/adminmovieview",
            }
        ]
    },
    {
        title: "Complaints",
        icon: <BiMessageError size={30} />,
        link: "/admincomplaintview"
    },
    {
        title: "Subscriptions",
        icon: <MdSubscriptions size={30} />,
        link: "/adminsubcriptionview"
    },

    {
        title: "Logout",
        icon: <SlLogout
            size={30} />,
        onClick: logoutHandler

    },
]




