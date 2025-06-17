import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="nav-bar flex w-full h-20 bg-[#002570] justify-between px-35 items-center pt-5">
            <div className="logo">
                <p className="text-4xl font-bold text-white">Medico</p>
            </div>
            <div className="nav-items">
                <ul className="flex gap-10 text-xl text-white ml-15">
                    <li className="hover:underline"><Link to="/">Home</Link></li>
                    <li className="hover:underline"><a href="#bottom-section">About</a></li>
                    <li className="hover:underline"><a href="">Campaign</a></li>
                    <li className="hover:underline"><a href="">Contact us</a></li>
                </ul>
            </div>
            <div className="btn flex gap-5 text-xl text-white">
                <div className="btn-left">
                    <Link to="/login" className="px-6 py-1 border border-white text-white rounded-full text-center flex justify-center items-center shadow-md">Login</Link>
                </div>
                <div className="btn-right">
                    <Link to="/registration" className="px-6 py-1 border border-white text-white rounded-full text-center flex justify-center items-center shadow-md">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
