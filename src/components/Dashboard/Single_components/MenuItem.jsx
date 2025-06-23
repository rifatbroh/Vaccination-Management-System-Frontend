// src/components/MenuItem.jsx
import React from 'react';

const MenuItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-white text-lg font-medium p-3 rounded-lg hover:bg-[#357a63] transition duration-300 cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

export default MenuItem;
