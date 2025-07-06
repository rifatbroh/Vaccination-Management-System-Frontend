import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { animated, useSpring } from "react-spring"; // Import from react-spring for animations

function MedicalHistoryByUserId() {
    const { id: userId } = useParams();
    const [data, setData] = useState(null);
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
            try {
                const res = await fetch(
                    `http://localhost:10/api/patient/medical-history/${userId}`
                );
                if (!res.ok) {
                    if (res.status === 404) {
                        // Trigger animation for "Upload your medical history"
                        setFadeIn({ opacity: 1, transform: "translateY(0)" });
                    }
                    throw new Error(
                        `Error fetching medical history: ${res.statusText}`
                    );
                }
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, setFadeIn]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-40 text-gray-500 text-lg">
                Loading medical history...
            </div>
        );

    if (error)
        return (
            <div className="text-red-600 bg-red-100 p-4 rounded max-w-xl mx-auto mt-6 text-center">
                Error: {error}
            </div>
        );

    if (!data)
        return (
            <div className="text-gray-600 bg-yellow-100 p-4 rounded max-w-xl mx-auto mt-6 text-center">
                {/* Animated message when medical history is not found */}
                <animated.div
                    style={fadeIn}
                    className="text-xl font-semibold text-blue-600"
                >
                    Upload your medical history
                </animated.div>
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Medical History for User ID:{" "}
                <span className="font-mono text-indigo-600">{userId}</span>
            </h2>

            <p className="mb-6 text-gray-700">
                <strong>Patient ID:</strong>{" "}
                <span className="font-mono">{data.patient}</span>
            </p>

            {/* Allergies */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Allergies
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                    {data.allergies.length ? (
                        data.allergies.map((a, i) => (
                            <li
                                key={i}
                                className="hover:text-indigo-600 transition-colors"
                            >
                                {a}
                            </li>
                        ))
                    ) : (
                        <li className="italic text-gray-400">None</li>
                    )}
                </ul>
            </section>

            {/* Chronic Diseases */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Chronic Diseases
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                    {data.chronicDiseases.length ? (
                        data.chronicDiseases.map((d, i) => (
                            <li
                                key={i}
                                className="hover:text-indigo-600 transition-colors"
                            >
                                {d}
                            </li>
                        ))
                    ) : (
                        <li className="italic text-gray-400">None</li>
                    )}
                </ul>
            </section>

            {/* Medications */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Medications
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                    {data.medications.length ? (
                        data.medications.map(
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
                        <li className="italic text-gray-400">None</li>
                    )}
                </ul>
            </section>

            {/* Vaccination History */}
            <section>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Vaccination History
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                    {data.vaccinationHistory.length ? (
                        data.vaccinationHistory.map(({ vaccine, date }, i) => (
                            <li
                                key={i}
                                className="hover:text-indigo-600 transition-colors"
                            >
                                {(vaccine && vaccine.name) || "Unknown vaccine"}{" "}
                                —{" "}
                                {date
                                    ? new Date(date).toLocaleDateString()
                                    : "Date unavailable"}
                            </li>
                        ))
                    ) : (
                        <li className="italic text-gray-400">None</li>
                    )}
                </ul>
            </section>
        </div>
    );
}

export default MedicalHistoryByUserId;
