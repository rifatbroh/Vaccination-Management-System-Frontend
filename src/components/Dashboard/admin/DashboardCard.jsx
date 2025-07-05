const DashboardCard = ({ title, value, icon, bgColor }) => {
    return (
        <div className={`bg-gradient-to-br ${bgColor} text-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out`}>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <p className="text-4xl font-bold mt-2">{value}</p>
                </div>
                <div className="text-5xl opacity-30">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
