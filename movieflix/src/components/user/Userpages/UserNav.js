import React, { useState } from 'react';
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserNav() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [query, setQuery] = useState('');

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // Handle the search
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search?query=${query}`);
            const movies = response.data;

            if (movies.length === 1) {
                // Store the movie ID in localStorage and navigate
                localStorage.setItem('moreinfomovie_id', movies[0]._id);
                navigate('/movieview');
            } else if (movies.length > 1) {
                alert("Multiple movies found. Redirecting to the first one.");
                // Store the first movie's ID in localStorage and navigate
                localStorage.setItem('moreinfomovie_id', movies[0]._id);
                navigate(`/movieview/${movies[0]._id}`);
            } else {
                alert("No movies found.");
            }
        } catch (error) {
            console.error("Error during search:", error);
        }
    };

    // Handle search when the user presses Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const logoutHandler =()=>{
        localStorage.removeItem('user_Id')
        navigate('/')
    }

    return (
        <div>
            <div className="flex items-center justify-between px-4 py-4 bg-black bg-opacity-0 fixed w-full z-10">
                <h1 className="text-red-600 text-3xl font-bold">Movieflix</h1>
                <div className="flex items-center space-x-12 text-white">
                    {/* Search Icon */}
                    <FaSearch className="w-5 h-5 cursor-pointer" onClick={toggleSearch} />
                    {isSearchOpen && (
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress} // Trigger search on Enter key press
                            className="absolute top-4 left-[59rem] w-52 p-1 bg-white opacity-60 text-black rounded-lg shadow-lg focus:outline-none"
                        />
                    )}
                    <FaBell className="w-5 h-5 cursor-pointer" />
                    <div className="relative">
                        <FaUser className="w-5 h-5 cursor-pointer" onClick={toggleDropdown} />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-4 w-40 text-center bg-black opacity-85 p-4 rounded-xl z-20">
                                <ul className="py-2 text-white font-bold">
                                    <li className="px-4 py-2 hover:bg-red-600 rounded-xl cursor-pointer" onClick={() => { navigate('/userprofile') }}>Profile</li>
                                    <li className="px-4 py-2 hover:bg-red-600 rounded-xl cursor-pointer" onClick={() => { navigate('/usersubscriptionview') }}>Subscription</li>
                                    <li className="px-4 py-2 hover:bg-red-600 rounded-xl cursor-pointer" onClick={() => { navigate('/usercomplaint') }}>Complaint</li>
                                    <li className="px-4 py-2 hover:bg-red-600 cursor-pointer" onClick={logoutHandler}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserNav;
