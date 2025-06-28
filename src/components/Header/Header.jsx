import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login2 from "../Authintication/Login";
import RegisterModal from "../Authintication/Register";

const Header = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [user, setUser] = useState(null); // To store the logged-in user details
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Function to load user data from localStorage
    const loadUserData = () => {
        const token = localStorage.getItem("authToken");
        const userData = JSON.parse(localStorage.getItem("user"));
        if (token && userData) {
            setUser(userData); // Set user data if token exists
        }
    };

    useEffect(() => {
        loadUserData();
        // Add event listener to detect localStorage changes
        const handleStorageChange = () => {
            loadUserData();
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/");
        setUser(null);
    };

    return (
        <>
            <div className="nav-bar flex w-full h-20 bg-[#002570] justify-between px-34 items-center pt-5">
                <div className="logo">
                    <p className="text-4xl font-bold text-white">Medico</p>
                </div>
                <div className="nav-items">
                    <ul className="flex gap-10 text-xl text-white ml-15 font-semibold">
                        <li className="hover:underline">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:underline">
                            <a href="#bottom-section">About</a>
                        </li>
                        <li className="hover:underline">
                            <a href="#">Campaign</a>
                        </li>
                        <li className="hover:underline">
                            <a href="#">Contact us</a>
                        </li>
                    </ul>
                </div>
                <div className="btn flex gap-5 text-xl text-white">
                    {user ? (
                        <div className="relative">
                            <div className="profile mt-5">
                                   <button
                                        onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                        }
                                        className="cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-14">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </button>
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2 z-50">
                                    {/* User Info */}
                                    <div className="px-4 py-2 border-b border-gray-200 font-semibold">
                                        👤 {user.name}
                                     </div>

                                     {/* Dashboard */}
                                    <button
                                        onClick={() => navigate("/admin/dashboard")}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                                    >
                                        Dashboard
                                    </button>

                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}

                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="cursor-pointer px-6 py-1 border border-white rounded-full shadow-md hover:bg-blue-600"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="cursor-pointer px-6 py-1 border border-white rounded-full shadow-md hover:bg-blue-600"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Modals */}
            {isLoginOpen && (
                <Login2
                    onClose={() => setIsLoginOpen(false)}
                    setUser={setUser} // Pass the setUser function
                />
            )}
            {isRegisterOpen && (
                <RegisterModal onClose={() => setIsRegisterOpen(false)} />
            )}
        </>
    );
};

export default Header;
