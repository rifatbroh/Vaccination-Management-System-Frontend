import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const DoctorAppointments = () => {
    const { id: doctorId } = useParams();

    const [appointments, setAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(false);
    const [error, setError] = useState(null);

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(false);

    const modalRef = useRef();

    const fetchAppointments = async () => {
        setLoadingAppointments(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:10/api/doctor/appointments/${doctorId}`);
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

    const updateAppointmentStatus = async (appointmentId, status) => {
        setError(null);
        try {
            const res = await fetch(`http://localhost:10/api/doctor/appointment/${appointmentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (res.ok) fetchAppointments();
            else setError(data.error || "Failed to update appointment");
        } catch {
            setError("Error updating appointment");
        }
    };

    const fetchMedicalHistory = async (patient) => {
        setSelectedPatient(patient);
        setLoadingHistory(true);
        setMedicalHistory(null);
        setError(null);
        try {
            const res = await fetch(`http://localhost:10/api/doctor/patient-history/${patient._id}`);
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

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setSelectedPatient(null);
            setMedicalHistory(null);
        }
    };

    useEffect(() => {
        if (doctorId) fetchAppointments();
    }, [doctorId]);

    useEffect(() => {
        if (selectedPatient) {
            document.addEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [selectedPatient]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Doctor's Appointments</h1>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

            {loadingAppointments ? (
                <p className="text-center text-gray-600">Loading appointments...</p>
            ) : appointments.length === 0 ? (
                <p className="text-center text-gray-500">No appointments found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.map((appt) => (
                        <div
                            key={appt._id}
                            className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-300 bg-white"
                        >
                            <div className="mb-4 space-y-2">
                                <p>
                                    <span className="font-semibold text-gray-700">Patient:</span>{" "}
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() => fetchMedicalHistory(appt.patient)}
                                    >
                                        {appt.patient.name}
                                    </button>
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Vaccine:</span>{" "}
                                    {appt.vaccine.name}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Date:</span>{" "}
                                    {new Date(appt.date).toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Status:</span>{" "}
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
                                        onClick={() => updateAppointmentStatus(appt._id, "approved")}
                                        className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateAppointmentStatus(appt._id, "rejected")}
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

            {/* Modal */}
            {selectedPatient && (
                <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div
                        ref={modalRef}
                        className="bg-white max-w-2xl w-full rounded-lg shadow-xl p-8 border border-gray-200 relative"
                    >
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                            {selectedPatient.name}'s Medical History
                        </h2>
                        {loadingHistory ? (
                            <p className="text-gray-600">Loading...</p>
                        ) : medicalHistory ? (
                            <div>
                                <p className="mb-2 text-sm text-gray-500">
                                    <strong>Patient ID:</strong> {medicalHistory.patient}
                                </p>

                                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800">Vaccination History:</h3>
                                {medicalHistory.vaccinationHistory?.length ? (
                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                        {medicalHistory.vaccinationHistory.map((vh, i) => (
                                            <li key={i}>
                                                {vh.vaccine?.name || "Unknown vaccine"} —{" "}
                                                {new Date(vh.date).toLocaleDateString()}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">No vaccination records.</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-600">No medical history available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorAppointments;
