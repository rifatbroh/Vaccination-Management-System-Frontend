import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login2 from '../Login2';
import RegisterModal from '../Register'; // Import the modal

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <div className="nav-bar flex w-full h-20 bg-[#002570] justify-between px-35 items-center pt-5">
        <div className="logo">
          <p className="text-4xl font-bold text-white">Medico</p>
        </div>
        <div className="nav-items">
          <ul className="flex gap-10 text-xl text-white ml-15">
            <li className="hover:underline"><Link to="/">Home</Link></li>
            <li className="hover:underline"><a href="#bottom-section">About</a></li>
            <li className="hover:underline"><a href="#">Campaign</a></li>
            <li className="hover:underline"><a href="#">Contact us</a></li>
          </ul>
        </div>
        <div className="btn flex gap-5 text-xl text-white">
          <button onClick={() => setIsLoginOpen(true)} className="cursor-pointer px-6 py-1 border border-white rounded-full shadow-md">
            Login
          </button>
          <button onClick={() => setIsRegisterOpen(true)} className="cursor-pointer px-6 py-1 border border-white rounded-full shadow-md">
            Register
          </button>
        </div>
      </div>

      {/* Modals */}
      {isLoginOpen && <Login2 onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
    </>
  );
};

export default Header;
