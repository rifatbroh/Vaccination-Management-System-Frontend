import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserAlt, FaEnvelope, FaBirthdayCake, FaUserTag, FaNotesMedical } from "react-icons/fa";

const PatientProfile = ({ id }) => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const fetchPatientProfile = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:10/api/patient/getprofile/${id}`
                );
                setPatient(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch patient profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatientProfile();
    }, [id]);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl duration-300">
                {/* Left: Basic Info */}
                <div className="w-full md:w-2/3 p-6 bg-gradient-to-br from-blue-50 to-purple-100">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <FaUserAlt className="text-blue-500" />
                        {patient.user.name}
                    </h2>
                    <ul className="space-y-3 text-gray-700 text-sm">
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-400" />
                            <span><strong>Email:</strong> {patient.user.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaUserTag className="text-blue-400" />
                            <span><strong>Role:</strong> {patient.user.role}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaBirthdayCake className="text-blue-400" />
                            <span>
                                <strong>DOB:</strong>{" "}
                                {new Date(patient.dateOfBirth).toLocaleDateString()}
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Right: Button */}
                <div className="w-full md:w-1/3 flex items-center justify-center bg-white p-6">
                    <button
                        onClick={() => setShowHistory(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-full flex items-center gap-2 text-sm shadow-lg transition"
                    >
                        <FaNotesMedical />
                        View Medical History
                    </button>
                </div>
            </div>

            {/* Slide-In Modal from Right */}
            {showHistory && (
                <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm overflow-y-auto bg-opacity-40 transition duration-300">
                    <div className="w-full sm:w-[90%] md:w-[500px] bg-white p-6 shadow-2xl overflow-y-auto max-h-screen relative animate-slide-in-right">
                        <button
                            onClick={() => setShowHistory(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
                            Medical History
                        </h2>

                        {/* Allergies */}
                        {patient.medicalHistory?.allergies?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800">Allergies</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {patient.medicalHistory.allergies.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Chronic Diseases */}
                        {patient.medicalHistory?.chronicDiseases?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800">Chronic Diseases</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {patient.medicalHistory.chronicDiseases.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Medications */}
                        {patient.medicalHistory?.medications?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800">Medications</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {patient.medicalHistory.medications.map((m, index) => (
                                        <li key={index}>
                                            <strong>{m.name}</strong> – {m.dosage} ({m.frequency})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Vaccination History */}
                        {patient.medicalHistory?.vaccinationHistory?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-800">Vaccination History</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {patient.medicalHistory.vaccinationHistory.map((v, index) => (
                                        <li key={index}>
                                            <strong>{v.vaccine.name}</strong> –{" "}
                                            {new Date(v.date).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientProfile;
