import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarPlus, FaUserMd, FaSyringe, FaTimes } from "react-icons/fa";

const PatientAppointments = () => {
    const { id: patientId } = useParams();

    const [appointments, setAppointments] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [appointmentsError, setAppointmentsError] = useState(null);

    const [doctors, setDoctors] = useState([]);
    const [vaccines, setVaccines] = useState([]);
    const [doctor, setDoctor] = useState("");
    const [vaccine, setVaccine] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");
    const [bookingMessage, setBookingMessage] = useState(null);

    const [showModal, setShowModal] = useState(false);

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
            } catch (err) {
                setAppointmentsError("❌ Failed to load appointments.");
            } finally {
                setLoadingAppointments(false);
            }
        };

        fetchAppointments();
    }, [patientId]);

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
        if (!patientId) return;

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
            <div className="text-red-600 text-center p-6 text-lg font-semibold">
                ❌ No patient ID provided in the URL.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-[#2a56fa]">
                    🗓️ Your Appointments
                </h2>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
                >
                    <FaCalendarPlus /> Book Appointment
                </button>
            </div>

            {/* Appointment List */}
            {loadingAppointments ? (
                <div className="text-center text-blue-500 font-semibold">
                    Loading appointments...
                </div>
            ) : appointmentsError ? (
                <div className="text-center text-red-600 font-semibold">
                    {appointmentsError}
                </div>
            ) : appointments.length === 0 ? (
                <div className="text-center text-gray-500 font-medium">
                    No appointments found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.map((appt) => (
                        <div
                            key={appt._id}
                            className="bg-white border rounded-xl shadow hover:shadow-lg transition p-5"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Dr. {appt.doctor?.name || "N/A"}
                                </h3>
                                <span
                                    className={`text-sm px-3 py-1 rounded-full font-semibold ${
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
                            <p className="text-gray-600">
                                <FaSyringe className="inline mr-2" />
                                <strong>Vaccine:</strong>{" "}
                                {appt.vaccine?.name || "N/A"}
                            </p>
                            <p className="text-gray-600">
                                <strong>Date:</strong>{" "}
                                {new Date(appt.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>Created:</strong>{" "}
                                {new Date(appt.createdAt).toLocaleString()}
                            </p>
                            <p className="text-gray-600">
                                <strong>Email:</strong>{" "}
                                {appt.doctor?.email || "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <>
                    <div
                        className="fixed inset-0 backdrop-blur-sm overflow-y-auto bg-opacity-40 z-40"
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                        <div className="bg-white bg-opacity-95 backdrop-blur-xl rounded-xl shadow-lg w-full max-w-xl p-8 relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
                            >
                                <FaTimes />
                            </button>
                            <h3 className="text-2xl font-bold text-blue-700 mb-4">
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

                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                {/* Doctor */}
                                <div>
                                    <label className="block font-semibold mb-1">
                                        Select Doctor
                                    </label>
                                    <select
                                        value={doctor}
                                        onChange={(e) => setDoctor(e.target.value)}
                                        className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                                        required
                                    >
                                        <option value="">-- Choose --</option>
                                        {doctors.map((doc) => (
                                            <option key={doc.user?._id} value={doc.user?._id}>
                                                {doc.user?.name} — {doc.specialization || "N/A"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Vaccine */}
                                <div>
                                    <label className="block font-semibold mb-1">
                                        Select Vaccine
                                    </label>
                                    <select
                                        value={vaccine}
                                        onChange={(e) => setVaccine(e.target.value)}
                                        className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                                        required
                                    >
                                        <option value="">-- Choose --</option>
                                        {vaccines.map((v) => (
                                            <option key={v._id} value={v._id}>
                                                {v.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block font-semibold mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>

                                {/* Time */}
                                <div>
                                    <label className="block font-semibold mb-1">Time</label>
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>

                                {/* Reason */}
                                <div>
                                    <label className="block font-semibold mb-1">Reason</label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                                        rows={3}
                                        placeholder="Optional notes..."
                                    ></textarea>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 rounded-full font-semibold hover:scale-105 transition-transform"
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
