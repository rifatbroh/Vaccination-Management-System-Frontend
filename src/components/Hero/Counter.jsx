import axios from "axios";
import { useEffect, useState } from "react";

const Counter = () => {
    const [patients, setPatients] = useState(0);
    const [doctors, setDoctors] = useState(0); // No doctors count in API response, so I'll keep it 0 or you can remove it if needed
    const [vaccinations, setVaccinations] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state for visual feedback
    const [error, setError] = useState(null); // Error state for handling API failure

    // Animate helper function
    const animateValue = (setValue, target) => {
        let current = 0;
        const duration = 1000;
        const stepTime = Math.max(Math.floor(duration / target), 50);

        const timer = setInterval(() => {
            current += 1;
            setValue(current);
            if (current >= target) {
                clearInterval(timer);
            }
        }, stepTime);
    };

    useEffect(() => {
        // Fetch real data from API
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const res = await axios.get(
                    "http://localhost:10/api/landingPage/heroCard"
                );
                const data = res.data;

                // Check if the API response has the required fields
                if (
                    data &&
                    data.numberOfPatients !== undefined &&
                    data.numberOfVaccines !== undefined
                ) {
                    animateValue(setPatients, data.numberOfPatients || 0);
                    animateValue(setDoctors, 4); // or 0 if you prefer
                    animateValue(setVaccinations, data.numberOfVaccines || 0);
                } else {
                    setError("Invalid API response");
                }
            } catch (error) {
                setError("Failed to fetch data.");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false once the API call completes
            }
        };

        fetchData();
    }, []);

    // Show loading state while fetching data
    if (loading) {
        return (
            <div className="text-center p-6 text-blue-600 font-semibold">
                Loading data...
            </div>
        );
    }

    // Show error message if fetching failed
    if (error) {
        return (
            <div className="text-center p-6 text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="card flex justify-center gap-20 bg-[#002570] mt-20 mx-60 rounded-xl shadow-lg">
                <div className="card-1 h-40 w-60 flex flex-col justify-center items-center">
                    <h1 className="text-6xl font-bold text-[#e1eeff]">
                        {patients}+
                    </h1>
                    <p className="text-3xl text-white">Patients</p>
                </div>
                <div className="card-1 h-40 w-60 flex flex-col justify-center items-center">
                    <h1 className="text-6xl font-bold text-[#e1eeff]">
                        {doctors.toString().padStart(2, "0")}+
                    </h1>
                    <p className="text-3xl text-white mr-5">Doctors</p>
                </div>
                <div className="card-1 h-40 w-60 flex flex-col justify-center items-center">
                    <h1 className="text-6xl font-bold text-[#e1eeff]">
                        {vaccinations.toString().padStart(2, "0")}+
                    </h1>
                    <p className="text-3xl text-white">Vaccination</p>
                </div>
            </div>
        </div>
    );
};

export default Counter;
