/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import {
    FaBirthdayCake,
    FaEnvelope,
    FaUserAlt,
    FaUserTag,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { animated, useSpring } from "react-spring"; // Import from react-spring for animations

const PatientProfileWithHistory = () => {
    const { id: userId } = useParams();

    const [patient, setPatient] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Animation setup using react-spring
    const [fadeIn, setFadeIn] = useSpring(() => ({
        opacity: 0,
        transform: "translateY(-20px)",
    }));

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setLoading(true);

            try {
                // Fetch patient profile
                const profileRes = await axios.get(
                    `http://localhost:10/api/patient/getprofile/${userId}`
                );
                setPatient(profileRes.data);

                // Fetch medical history
                const historyRes = await fetch(
                    `http://localhost:10/api/patient/medical-history/${userId}`
                );

                if (!historyRes.ok) {
                    if (historyRes.status === 404) {
                        // Trigger animation for "Upload your medical history"
                        setFadeIn({ opacity: 1, transform: "translateY(0)" });
                    }
                    throw new Error(
                        `Error fetching medical history: ${historyRes.statusText}`
                    );
                }

                const historyJson = await historyRes.json();
                setMedicalHistory(historyJson);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, setFadeIn]);

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

            {/* Medical History */}
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Medical History for User ID:{" "}
                    <span className="font-mono text-indigo-600">{userId}</span>
                </h2>

                {medicalHistory && (
                    <>
                        {/* Allergies */}
                        <section className="mb-6">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                                Allergies
                            </h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {medicalHistory.allergies.length ? (
                                    medicalHistory.allergies.map((a, i) => (
                                        <li
                                            key={i}
                                            className="hover:text-indigo-600 transition-colors"
                                        >
                                            {a}
                                        </li>
                                    ))
                                ) : (
                                    <li className="italic text-gray-400">
                                        None
                                    </li>
                                )}
                            </ul>
                        </section>

                        {/* Chronic Diseases */}
                        <section className="mb-6">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                                Chronic Diseases
                            </h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {medicalHistory.chronicDiseases.length ? (
                                    medicalHistory.chronicDiseases.map(
                                        (d, i) => (
                                            <li
                                                key={i}
                                                className="hover:text-indigo-600 transition-colors"
                                            >
                                                {d}
                                            </li>
                                        )
                                    )
                                ) : (
                                    <li className="italic text-gray-400">
                                        None
                                    </li>
                                )}
                            </ul>
                        </section>

                        {/* Medications */}
                        <section className="mb-6">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                                Medications
                            </h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {medicalHistory.medications.length ? (
                                    medicalHistory.medications.map(
                                        ({ name, dosage, frequency }, i) => (
                                            <li
                                                key={i}
                                                className="hover:text-indigo-600 transition-colors"
                                            >
                                                <span className="font-semibold">
                                                    {name}
                                                </span>{" "}
                                                — {dosage} — {frequency}
                                            </li>
                                        )
                                    )
                                ) : (
                                    <li className="italic text-gray-400">
                                        None
                                    </li>
                                )}
                            </ul>
                        </section>

                        {/* Vaccination History */}
                        <section>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                                Vaccination History
                            </h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {medicalHistory.vaccinationHistory.length ? (
                                    medicalHistory.vaccinationHistory.map(
                                        ({ vaccine, date }, i) => (
                                            <li
                                                key={i}
                                                className="hover:text-indigo-600 transition-colors"
                                            >
                                                {(vaccine && vaccine.name) ||
                                                    "Unknown vaccine"}{" "}
                                                —{" "}
                                                {date
                                                    ? new Date(
                                                          date
                                                      ).toLocaleDateString()
                                                    : "Date unavailable"}
                                            </li>
                                        )
                                    )
                                ) : (
                                    <li className="italic text-gray-400">
                                        None
                                    </li>
                                )}
                            </ul>
                        </section>
                    </>
                )}

                {/* Animated message when medical history is not found */}
                {!medicalHistory && (
                    <animated.div
                        style={fadeIn}
                        className="text-xl font-semibold text-blue-600"
                    >
                        Upload your medical history
                    </animated.div>
                )}
            </div>
        </div>
    );
};

export default PatientProfileWithHistory;
