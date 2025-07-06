import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DoctorAppointments = () => {
    const { id: doctorId } = useParams();

    const [appointments, setAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(false);
    const [error, setError] = useState(null);

    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Fetch all appointments for this doctor
    const fetchAppointments = async () => {
        setLoadingAppointments(true);
        setError(null);
        try {
            const res = await fetch(
                `http://localhost:10/api/doctor/appointments/${doctorId}`
            );
            const data = await res.json();
            if (res.ok) {
                setAppointments(data);
            } else {
                setError(data.message || "Failed to load appointments");
            }
        } catch (err) {
            setError("Error loading appointments");
        }
        setLoadingAppointments(false);
    };

    // Approve or Reject an appointment
    const updateAppointmentStatus = async (appointmentId, status) => {
        setError(null);
        try {
            const res = await fetch(
                `http://localhost:10/api/doctor/appointment/${appointmentId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status }),
                }
            );
            const data = await res.json();
            if (res.ok) {
                // Automatically reload the appointments list
                fetchAppointments();
            } else {
                setError(data.error || "Failed to update appointment");
            }
        } catch {
            setError("Error updating appointment");
        }
    };

    // Fetch medical history for a patient
    const fetchMedicalHistory = async (patientId) => {
        setSelectedPatientId(patientId);
        setMedicalHistory(null);
        setLoadingHistory(true);
        setError(null);
        try {
            const res = await fetch(
                `http://localhost:10/api/doctor/patient-history/${patientId}`
            );
            const data = await res.json();
            if (res.ok) {
                setMedicalHistory(data);
            } else {
                setError(data.message || "Failed to load medical history");
            }
        } catch {
            setError("Error loading medical history");
        }
        setLoadingHistory(false);
    };

    useEffect(() => {
        if (doctorId) fetchAppointments();
    }, [doctorId]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
                Doctor's Appointments
            </h1>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {error}
                </div>
            )}

            {loadingAppointments ? (
                <p className="text-center text-gray-600">
                    Loading appointments...
                </p>
            ) : appointments.length === 0 ? (
                <p className="text-center text-gray-500">
                    No appointments found.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.map((appt) => (
                        <div
                            key={appt._id}
                            className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-300 bg-white"
                        >
                            <div className="mb-4 space-y-2">
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Patient:
                                    </span>{" "}
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() =>
                                            fetchMedicalHistory(
                                                appt.patient._id
                                            )
                                        }
                                    >
                                        {appt.patient.name}
                                    </button>
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Vaccine:
                                    </span>{" "}
                                    {appt.vaccine.name}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Date:
                                    </span>{" "}
                                    {new Date(appt.date).toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Status:
                                    </span>{" "}
                                    <span
                                        className={`font-bold ${
                                            appt.status === "approved"
                                                ? "text-green-600"
                                                : appt.status === "rejected"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }`}
                                    >
                                        {appt.status}
                                    </span>
                                </p>
                            </div>

                            {appt.status === "pending" && (
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() =>
                                            updateAppointmentStatus(
                                                appt._id,
                                                "approved"
                                            )
                                        }
                                        className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() =>
                                            updateAppointmentStatus(
                                                appt._id,
                                                "rejected"
                                            )
                                        }
                                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Medical History Section */}
            <div className="mt-12">
                {selectedPatientId && (
                    <>
                        <h2 className="text-3xl font-semibold mb-4 text-indigo-700">
                            Patient Medical History
                        </h2>

                        {loadingHistory ? (
                            <p className="text-gray-600">
                                Loading medical history...
                            </p>
                        ) : medicalHistory ? (
                            <div className="bg-gray-50 p-6 rounded-lg shadow max-w-3xl">
                                <p className="mb-2">
                                    <strong>Patient ID:</strong>{" "}
                                    {medicalHistory.patient}
                                </p>

                                <h3 className="text-xl font-semibold mt-4 mb-3">
                                    Vaccination History:
                                </h3>
                                {medicalHistory.vaccinationHistory?.length ? (
                                    <ul className="list-disc list-inside space-y-1">
                                        {medicalHistory.vaccinationHistory.map(
                                            (vh, idx) => (
                                                <li key={idx}>
                                                    {vh.vaccine?.name ||
                                                        "Unknown vaccine"}{" "}
                                                    -{" "}
                                                    {new Date(
                                                        vh.date
                                                    ).toLocaleDateString()}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p>No vaccination history available.</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-600">
                                Select a patient to see medical history.
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;
