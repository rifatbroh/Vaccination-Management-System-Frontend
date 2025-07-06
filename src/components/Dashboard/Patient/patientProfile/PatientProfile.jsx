import axios from "axios";
import { useEffect, useState } from "react";
import {
    FaBirthdayCake,
    FaEnvelope,
    FaUserAlt,
    FaUserTag,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const PatientProfile = () => {
    const { id: userId } = useParams();

    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            if (!userId) {
                setError("User ID is missing");
                return;
            }

            setLoading(true);
            try {
                const profileRes = await axios.get(
                    `http://localhost:10/api/patient/getprofile/${userId}`
                );

                setPatient(profileRes.data); // Set profile data
            } catch (err) {
                console.error(err);
                setError("Failed to fetch patient data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading)
        return <div className="p-6 text-center text-gray-500">Loading...</div>;
    if (error)
        return <div className="p-6 text-red-600 text-center">{error}</div>;
    if (!patient)
        return (
            <div className="p-6 text-red-600 text-center">
                Patient data unavailable.
            </div>
        );

    const { user, dateOfBirth } = patient;
    const userName = user?.name || "N/A";
    const userEmail = user?.email || "N/A";
    const userRole = user?.role || "N/A";

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Patient Info Card */}
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl duration-300 mb-8">
                <div className="w-full md:w-full p-6 bg-gradient-to-br from-blue-50 to-purple-100">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <FaUserAlt className="text-blue-500" />
                        {userName}
                    </h2>
                    <ul className="space-y-3 text-gray-700 text-sm">
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-400" />
                            <span>
                                <strong>Email:</strong> {userEmail}
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaUserTag className="text-blue-400" />
                            <span>
                                <strong>Role:</strong> {userRole}
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaBirthdayCake className="text-blue-400" />
                            <span>
                                <strong>DOB:</strong>{" "}
                                {dateOfBirth
                                    ? new Date(dateOfBirth).toLocaleDateString()
                                    : "Date of Birth not available"}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
