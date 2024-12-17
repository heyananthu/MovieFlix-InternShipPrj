import React from "react";
import { SupportSideBarData } from "./SupportSideBarData"; // Import the sidebar data
import { Link, useNavigate } from "react-router-dom";

function SupportSideBar() {
    const navigate = useNavigate();

    // Define the logoutHandler function
    const logoutHandler = () => {
        localStorage.removeItem("support"); // Remove support data from localStorage
        navigate("/supportlogin"); // Redirect to login page
    };

    // Pass logoutHandler to the SupportSideBarData function to handle logout
    const sideBarData = SupportSideBarData(logoutHandler);

    return (
        <div className="h-screen w-72 bg-slate-800 shadow-sm shadow-white fixed">
            <h1 className="h-16 bg-red-600 flex justify-center items-center font-sans text-2xl font-black text-gray-200">
                Customer Support
            </h1>
            <div>
                <ul>
                    {sideBarData.map((obj, key) => (
                        <li
                            key={key}
                            className="h-16 w-full hover:bg-slate-700 text-gray-200 text-lg font-semibold"
                        >
                            {/* Check if item has onClick, if so, execute the function */}
                            {obj.onClick ? (
                                <button
                                    onClick={obj.onClick}
                                    className="flex items-center space-x-4 w-full h-full px-4 text-left"
                                >
                                    <div className="text-gray-200">{obj.icon}</div>
                                    <span className="flex-1">{obj.title}</span>
                                </button>
                            ) : (
                                <Link
                                    to={obj.link}
                                    className="flex items-center space-x-4 w-full h-full px-4"
                                >
                                    <div className="text-gray-200">{obj.icon}</div>
                                    <span className="flex-1">{obj.title}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SupportSideBar;
