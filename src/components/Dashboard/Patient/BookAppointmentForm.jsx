import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookAppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    vaccineId: "",
    date: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [doctorRes, vaccineRes] = await Promise.all([
          axios.get("http://localhost:10/api/landingPage/doctors"),
          axios.get("http://localhost:10/api/landingPage/vaccines"),
        ]);

        const filteredDoctors = doctorRes.data.filter((doc) => doc.user !== null);
        setDoctors(filteredDoctors);
        setVaccines(vaccineRes.data);
      } catch {
        setMessage({
          type: "error",
          text: "Failed to load doctor or vaccine list.",
        });
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.doctorId || !form.vaccineId || !form.date) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to book this appointment?"
    );
    if (!confirmed) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:10/api/patient/appointment",
        {
          doctorId: form.doctorId,
          vaccineId: form.vaccineId,
          date: form.date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        type: "success",
        text: "Appointment booked successfully!",
      });
      setForm({ doctorId: "", vaccineId: "", date: null });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.error || "Booking failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md border">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Book Appointment
      </h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded text-sm ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Doctor Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Doctor
          </label>
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">-- Choose Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                Dr. {doc.user?.name || "Unnamed"} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        {/* Vaccine Field - clearly separated */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Vaccine
          </label>
          <select
            name="vaccineId"
            value={form.vaccineId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">-- Choose Vaccine --</option>
            {vaccines.map((vax) => (
              <option key={vax._id} value={vax._id}>
                {vax.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <DatePicker
            selected={form.date}
            onChange={(date) =>
              setForm((prev) => ({ ...prev, date }))
            }
            minDate={new Date()}
            className="w-full px-3 py-2 border rounded"
            placeholderText="Select date"
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointmentForm;
