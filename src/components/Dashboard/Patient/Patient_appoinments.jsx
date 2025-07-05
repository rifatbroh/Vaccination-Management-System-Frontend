import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientAppointments = () => {
    const { id: patientId } = useParams();

    // Appointment list states
    const [appointments, setAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [appointmentsError, setAppointmentsError] = useState(null);

    // Booking form states
    const [doctors, setDoctors] = useState([]);
    const [vaccines, setVaccines] = useState([]);
    const [doctor, setDoctor] = useState("");
    const [vaccine, setVaccine] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");
    const [bookingMessage, setBookingMessage] = useState(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);

    // Fetch appointments for patient
    useEffect(() => {
        if (!patientId) return;

        const fetchAppointments = async () => {
            try {
                setLoadingAppointments(true);
                const res = await axios.get(
                    `http://localhost:10/api/patient/appointments/${patientId}`
                );
                setAppointments(res.data);
                setAppointmentsError(null);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setAppointmentsError("Failed to load appointments.");
            } finally {
                setLoadingAppointments(false);
            }
        };

        fetchAppointments();
    }, [patientId]);

    // Fetch doctors and vaccines when modal is opened
    useEffect(() => {
        if (!showModal) return;

        const fetchDoctors = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:10/api/landingPage/doctors"
                );
                setDoctors(res.data);
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            }
        };

        const fetchVaccines = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:10/api/landingPage/vaccines"
                );
                setVaccines(res.data);
            } catch (err) {
                console.error("Failed to fetch vaccines:", err);
            }
        };

        fetchDoctors();
        fetchVaccines();
    }, [showModal]);

    const resetForm = () => {
        setDoctor("");
        setVaccine("");
        setDate("");
        setTime("");
        setReason("");
        setBookingMessage(null);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!patientId) {
            setBookingMessage("❌ Patient ID is missing.");
            return;
        }

        try {
            await axios.post("http://localhost:10/api/patient/appointment/", {
                patient: patientId,
                doctor,
                vaccine,
                date,
                time,
                reason,
            });
            setBookingMessage("✅ Appointment booked successfully!");
            resetForm();

            // Refresh appointments list
            const res = await axios.get(
                `http://localhost:10/api/patient/appointments/${patientId}`
            );
            setAppointments(res.data);
            setAppointmentsError(null);
        } catch (err) {
            console.error("Booking failed:", err);
            setBookingMessage("❌ Failed to book appointment.");
        }
    };

    if (!patientId) {
        return (
            <div className="text-red-600 text-center p-6">
                ❌ No patient ID provided in the URL.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-700">
                    🗓️ Your Appointments
                </h2>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Book Appointment
                </button>
            </div>

            {/* Appointments List */}
            {loadingAppointments ? (
                <div className="text-center p-6 text-blue-600 font-semibold">
                    Loading appointments...
                </div>
            ) : appointmentsError ? (
                <div className="text-center p-6 text-red-600 font-semibold">
                    {appointmentsError}
                </div>
            ) : appointments.length === 0 ? (
                <div className="text-center p-6 text-gray-600 font-medium">
                    No appointments found.
                </div>
            ) : (
                <ul className="space-y-4">
                    {appointments.map((appt) => (
                        <li
                            key={appt._id}
                            className="border rounded p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Dr. {appt.doctor?.name || "N/A"}
                                </h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        appt.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : appt.status === "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {appt.status.charAt(0).toUpperCase() +
                                        appt.status.slice(1)}
                                </span>
                            </div>

                            <p className="text-gray-600 mb-1">
                                <strong>Vaccine:</strong>{" "}
                                {appt.vaccine?.name || "None"}
                            </p>

                            <p className="text-gray-600 mb-1">
                                <strong>Date:</strong>{" "}
                                {new Date(appt.date).toLocaleDateString(
                                    undefined,
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </p>

                            <p className="text-gray-600 mb-1">
                                <strong>Created At:</strong>{" "}
                                {new Date(appt.createdAt).toLocaleString()}
                            </p>

                            <p className="text-gray-600">
                                <strong>Doctor Email:</strong>{" "}
                                {appt.doctor?.email || "N/A"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal */}
            {showModal && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 z-40"
                        onClick={() => setShowModal(false)}
                    ></div>

                    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded shadow-lg max-w-md w-full p-6 relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                            <h3 className="text-2xl font-bold mb-4 text-blue-700">
                                📅 Book an Appointment
                            </h3>

                            {bookingMessage && (
                                <div
                                    className={`mb-4 text-center font-semibold ${
                                        bookingMessage.includes("✅")
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {bookingMessage}
                                </div>
                            )}

                            <form
                                onSubmit={handleBookingSubmit}
                                className="space-y-4"
                            >
                                {/* Doctor Selection */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Select Doctor
                                    </label>
                                    <select
                                        value={doctor}
                                        onChange={(e) =>
                                            setDoctor(e.target.value)
                                        }
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    >
                                        <option value="">
                                            -- Select Doctor --
                                        </option>
                                        {doctors.map((doc) => (
                                            <option
                                                key={doc.user?._id}
                                                value={doc.user?._id}
                                            >
                                                {doc.user?.name} -{" "}
                                                {doc.specialization || "N/A"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Vaccine Selection */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Select Vaccine
                                    </label>
                                    <select
                                        value={vaccine}
                                        onChange={(e) =>
                                            setVaccine(e.target.value)
                                        }
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    >
                                        <option value="">
                                            -- Select Vaccine --
                                        </option>
                                        {vaccines.map((vax) => (
                                            <option
                                                key={vax._id}
                                                value={vax._id}
                                            >
                                                {vax.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date Input */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>

                                {/* Time Input */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) =>
                                            setTime(e.target.value)
                                        }
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>

                                {/* Reason Input */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Reason / Notes
                                    </label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) =>
                                            setReason(e.target.value)
                                        }
                                        className="w-full border px-3 py-2 rounded"
                                        rows={3}
                                        placeholder="Optional notes about your appointment..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
                                >
                                    Book Appointment
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PatientAppointments;
