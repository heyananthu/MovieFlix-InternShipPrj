import React, { useState } from "react";
import { AdminSidebarData } from "./AdminSidebarData";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
    const navigate = useNavigate();
    const [openSubMenu, setOpenSubMenu] = useState(null);

    // Handle submenu toggle
    const handleSubMenuToggle = (index) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    // Logout handler to remove admin from localStorage and navigate to login page
    const logoutHandler = () => {
        localStorage.removeItem("admin");
        navigate("/adminlogin");
    };

    // Pass logoutHandler to AdminSidebarData
    const sidebarData = AdminSidebarData(logoutHandler);

    return (
        <div className="h-screen w-72 bg-slate-800 shadow-sm shadow-white fixed">
            <h1 className="h-16 bg-red-600 flex justify-center items-center font-sans text-2xl font-black text-gray-200">
                Administrator
            </h1>
            <div>
                <ul>
                    {sidebarData.map((obj, key) => (
                        <li key={key} className="relative">
                            <div
                                className="h-16 w-full hover:bg-slate-700 text-gray-200 text-lg font-semibold cursor-pointer"
                                onClick={() => obj.subItem ? handleSubMenuToggle(key) : null}
                            >
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
                            </div>
                            {obj.subItem && openSubMenu === key && (
                                <ul className="pl-8">
                                    {obj.subItem.map((subObj, subKey) => (
                                        <li key={subKey} className="h-12 w-full hover:bg-slate-600 text-gray-200 text-lg font-semibold">
                                            <Link
                                                to={subObj.link || "#"}
                                                className="flex items-center space-x-4 w-full h-full px-4"
                                            >
                                                <div className="text-gray-200">{subObj.icon}</div>
                                                <span className="flex-1">{subObj.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminSidebar;
