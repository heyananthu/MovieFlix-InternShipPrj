import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { BiMessageError } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { SlLogout } from "react-icons/sl";

export const SupportSideBarData = (logoutHandler) => [
    {
        title: "Home",
        icon: <IoMdHome size={30} />,
        link: "/supporthome"
    },
    {
        title: "Reports",
        icon: <TbReportSearch size={30} />,
        link: "/supportreportview"
    },
    {
        title: "Users",
        icon: <FaUsers size={30} />,
        link: "/supportuserview"
    },
    {
        title: "Movies",
        icon: <MdLocalMovies size={30} />,
        link: "/supportmovieview"
    },
    {
        title: "Complaints",
        icon: <BiMessageError size={30} />,
        link: "/supportcomplaintview"
    },
    {
        title: "Subscriptions",
        icon: <MdSubscriptions size={30} />,
        link: "/supportsubscriptionview"
    },
    {
        title: "Logout",
        icon: <SlLogout size={30} />,
        onClick: logoutHandler, // Handler for logout action
    },
];
