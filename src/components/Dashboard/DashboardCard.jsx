// components/DashboardCard.jsx
import React from "react";

const DashboardCard = ({ title, value, color, icon }) => {
  return (
    <div className={`bg-white shadow-md p-6 rounded-lg text-center hover:scale-105 transition-transform`}>
      <div className="text-3xl mb-2">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className={`text-3xl font-bold ${color} mt-2`}>{value}</p>
    </div>
  );
};

export default DashboardCard;
