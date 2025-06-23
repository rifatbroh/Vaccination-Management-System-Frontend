import React from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';

const TopNav = () => {
  return (
    <div className="top-nav w-full flex items-center justify-between px-6 py-4">
      
      {/* Left - Search */}
      <div className="nav-left w-[80%] relative">
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search something..."
          className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#469b7e] transition"
        />
      </div>

      {/* Right - Profile & Notification */}
      <div className="nav-right flex items-center gap-6">

        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pinimg.com/736x/3b/f9/7c/3bf97c640b8732a64ab73b653f622582.jpg"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="text-right">
            <h1 className="text-xl font-semibold text-gray-800">rifatbroh</h1>
            <p className="text-[16px] text-gray-500">Admin</p>
          </div>
        </div>

         {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <FaBell className="text-xl text-gray-600" />
          <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
