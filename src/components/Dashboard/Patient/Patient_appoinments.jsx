// src/components/Dashboard/Patient/PatientAppointmentForm.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ⬅️ Import useParams

const Patient_appoinments = () => {
  const { id: patientId } = useParams(); // ⬅️ Get patient ID from URL
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (patientId) {
      fetchDoctors();
    }
  }, [patientId]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:10/api/landingPage/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:10/api/patient/appointment/", {
        patient: patientId,
        doctor,
        date,
        time,
        reason,
      });
      setMessage("✅ Appointment booked successfully!");
      setDoctor("");
      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      console.error("Booking failed:", err);
      setMessage("❌ Failed to book appointment.");
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📅 Book an Appointment</h2>

      {message && (
        <div
          className={`mb-4 text-center font-semibold ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.user?._id} value={doc.user?._id}>
                {doc.user?.name} - {doc.specialization || "N/A"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Reason / Notes</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            placeholder="Optional notes about your appointment..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Patient_appoinments;
