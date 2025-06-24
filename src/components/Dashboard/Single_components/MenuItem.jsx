import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, label, to }) => (
  <Link to={to}>
    <div className="flex items-center gap-3 text-white text-lg font-medium p-3 rounded-lg hover:bg-[#357a63] transition duration-300 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  </Link>
);

export default MenuItem;
