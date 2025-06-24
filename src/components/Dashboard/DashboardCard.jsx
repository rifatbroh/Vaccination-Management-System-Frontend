// components/DashboardCard.jsx
import React from "react";

const DashboardCard = ({ title, value, color, icon }) => {
  return (
    <div className={`bg-[#469b7e] shadow-md p-10 rounded-lg text-center hover:scale-105 transition-transform`}>
      <div className="text-3xl mb-2">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className={`text-3xl font-bold text-white ${color} mt-2`}>{value}</p>
    </div>
  );
};

export default DashboardCard;
