import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web"; // Import 'animated'

function MedicalHistoryByUserId() {
    const { id: userId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0); // For retry mechanism

    // Animation setup using react-spring for the "Upload" message
    const fadeInProps = useSpring({
        opacity: error && error.includes("404") ? 1 : 0, // Trigger animation specifically for 404
        transform: error && error.includes("404") ? "translateY(0)" : "translateY(-20px)",
        config: { mass: 1, tension: 170, friction: 26 },
    });

    const API_BASE_URL = "http://localhost:10/api/patient"; // Centralized API base URL

    const fetchData = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const res = await fetch(`${API_BASE_URL}/medical-history/${userId}`);
            if (!res.ok) {
                // More specific error messages
                if (res.status === 404) {
                    throw new Error("404: No medical history found for this user.");
                }
                throw new Error(`Error fetching medical history: ${res.status} ${res.statusText}`);
            }
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
            setData(null); // Ensure data is null on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) {
            setError("User ID is missing.");
            setLoading(false);
            return;
        }
        fetchData();
    }, [userId, retryCount]); // Dependency on retryCount to re-fetch

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="mt-6 h-5 bg-gray-200 rounded w-2/3"></div>
                <div className="space-y-3 mt-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
            </div>
        );
    }

    if (error) {
        // Specifically check for the 404 error message to display the upload prompt
        if (error.includes("404")) {
            return (
                <div className="text-gray-600 bg-blue-50 p-4 rounded max-w-xl mx-auto mt-6 text-center shadow-lg">
                    <animated.div style={fadeInProps} className="text-xl font-semibold text-blue-700">
                        No medical history found for this user.
                    </animated.div>
                    <p className="mt-2 text-gray-500">
                        It looks like there's no medical history uploaded yet.
                    </p>
                    {/* You might add a button here to navigate to an upload page */}
                    <button
                        onClick={() => alert("Navigate to upload page!")} // Placeholder for navigation
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Upload Medical History
                    </button>
                </div>
            );
        }
        // Generic error message for other errors
        return (
            <div className="text-red-700 bg-red-100 p-4 rounded max-w-xl mx-auto mt-6 text-center border border-red-300 shadow-md">
                <p className="font-semibold mb-2">Oops! Something went wrong.</p>
                <p>Error: {error}</p>
                <button
                    onClick={() => setRetryCount(prev => prev + 1)}
                    className="mt-4 px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // This case should ideally not be reached if error handles `!data` but kept for clarity
    if (!data) {
        return (
            <div className="text-gray-600 bg-yellow-100 p-4 rounded max-w-xl mx-auto mt-6 text-center">
                <p className="font-semibold">No medical history available.</p>
                <p className="text-sm text-gray-500">Please try refreshing the page or check the user ID.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-3 border-gray-200">
                Medical History for User ID:{" "}
                <span className="font-mono text-indigo-700">{userId}</span>
            </h2>

            <p className="mb-8 text-lg text-gray-700 flex items-center">
                <span className="mr-2 text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-5 0H5m5 0a2 2 0 110-4h2a2 2 0 110 4m-5 4a2 2 0 100 4h2a2 2 0 100-4m-5 4a2 2 0 100 4h2a2 2 0 100-4m-5 4a2 2 0 100 4h2a2 2 0 100-4" />
                    </svg>
                </span>
                <strong>Patient ID:</strong>{" "}
                <span className="font-mono text-gray-800 text-base">{data.patient}</span>
            </p>

            {/* Allergies */}
            <section className="mb-8 p-5 bg-indigo-50 rounded-lg border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                    <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </span>
                    Allergies
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                    {data.allergies && data.allergies.length ? (
                        data.allergies.map((a, i) => (
                            <li
                                key={i}
                                className="hover:text-indigo-600 transition-colors duration-200"
                            >
                                {a}
                            </li>
                        ))
                    ) : (
                        <li className="italic text-gray-500">No known allergies.</li>
                    )}
                </ul>
            </section>

            {/* Chronic Diseases */}
            <section className="mb-8 p-5 bg-green-50 rounded-lg border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                    <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c.045 4.383 2.176 8.341 5.308 10.976A12.001 12.001 0 0012 21.056c4.383-.045 8.341-2.176 10.976-5.308A12.001 12.001 0 0021.056 12a12.001 12.001 0 00-3.04-8.618z" />
                        </svg>
                    </span>
                    Chronic Diseases
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                    {data.chronicDiseases && data.chronicDiseases.length ? (
                        data.chronicDiseases.map((d, i) => (
                            <li
                                key={i}
                                className="hover:text-green-600 transition-colors duration-200"
                            >
                                {d}
                            </li>
                        ))
                    ) : (
                        <li className="italic text-gray-500">No chronic diseases reported.</li>
                    )}
                </ul>
            </section>

            {/* Medications */}
            <section className="mb-8 p-5 bg-purple-50 rounded-lg border border-purple-100">
                <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center">
                    <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </span>
                    Medications
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                    {data.medications && data.medications.length ? (
                        data.medications.map(
                            ({ name, dosage, frequency }, i) => (
                                <li
                                    key={i}
                                    className="hover:text-purple-600 transition-colors duration-200"
                                >
                                    <span className="font-semibold text-gray-800">{name}</span> —{" "}
                                    <span className="text-gray-600">{dosage}</span> —{" "}
                                    <span className="text-gray-600">{frequency}</span>
                                </li>
                            )
                        )
                    ) : (
                        <li className="italic text-gray-500">No current medications listed.</li>
                    )}
                </ul>
            </section>

            {/* Vaccination History */}
            <section className="p-5 bg-teal-50 rounded-lg border border-teal-100">
                <h3 className="text-xl font-bold text-teal-800 mb-3 flex items-center">
                    <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c.045 4.383 2.176 8.341 5.308 10.976A12.001 12.001 0 0012 21.056c4.383-.045 8.341-2.176 10.976-5.308A12.001 12.001 0 0021.056 12a12.001 12.001 0 00-3.04-8.618z" />
                        </svg>
                    </span>
                    Vaccination History
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                    {data.vaccinationHistory && data.vaccinationHistory.length ? (
                        data.vaccinationHistory.map(({ vaccine, date }, i) => (
                            <li
                                key={i}
                                className="hover:text-teal-600 transition-colors duration-200"
                            >
                                <span className="font-semibold text-gray-800">
                                    {(vaccine && vaccine.name) || "Unknown Vaccine"}
                                </span>{" "}
                                —{" "}
                                {date
                                    ? new Date(date).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      })
                                    : "Date Unavailable"}
                            </li>
                        ))
                    ) : (
                        <li className="italic text-gray-500">No vaccination records found.</li>
                    )}
                </ul>
            </section>
        </div>
    );
}

export default MedicalHistoryByUserId;