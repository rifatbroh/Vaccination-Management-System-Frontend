import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login2 from "../Login";
import RegisterModal from "../Register";

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
            <div className="nav-bar flex w-full h-20 bg-[#002570] justify-between px-8 items-center pt-5">
                <div className="logo">
                    <p className="text-4xl font-bold text-white">Medico</p>
                </div>
                <div className="nav-items">
                    <ul className="flex gap-10 text-xl text-white ml-15">
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
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="cursor-pointer px-6 py-1 border border-white rounded-full shadow-md hover:bg-blue-600"
                            >
                                {user.name}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg py-2">
                                    <button
                                        onClick={() => navigate("/dashboard")}
                                        className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
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
