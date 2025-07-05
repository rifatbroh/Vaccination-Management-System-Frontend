import React, { useEffect, useState } from "react";
import axios from "axios";

// Doctor Details Modal
const DoctorDetailsModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm-overflow-y-auto backdrop-blur-sm-overflow-y-auto bg-opacity-40 backdrop-blur-sm z-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Doctor Details</h2>
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Name:</strong> {doctor.user?.name || "N/A"}</p>
          <p><strong>Email:</strong> {doctor.user?.email || "N/A"}</p>
          <p><strong>Specialization:</strong> {doctor.specialization || "N/A"}</p>
          <p><strong>Experience:</strong> {doctor.experience || "N/A"} years</p>
          <p><strong>Qualifications:</strong> {doctor.qualifications?.join(", ") || "N/A"}</p>
          <p><strong>Status:</strong> {doctor.isApproved ? "Approved" : "Not Approved"}</p>
        </div>
        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Doctors Component
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:10/api/landingPage/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Could not load doctors.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const res = await axios.get(`http://localhost:10/api/landingPage/doctor/${doctorId}`);
      setSelectedDoctor(res.data);
    } catch (err) {
      console.error("Fetch details error:", err);
      setError("Failed to load doctor details.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="px-6 bg-[#e1eefe] from-blue-50 to-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-12 py-10">
        <h1 className="text-5xl font-bold text-[#002570]">
          Our <br /> <span className="text-[#1c76cb]">Expert Doctors</span>
        </h1>
        <p className="text-2xl text-gray-600 max-w-2xl mx-auto mt-4">
          Protecting you with modern healthcare. Explore our trusted professionals providing expert care and advice.
        </p>
      </div>

      {/* Carousel */}
      {loading ? (
        <div className="text-center text-lg">Loading doctors...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        // Added 'carousel-container' class to allow pausing animation on hover
        <div className="overflow-hidden relative carousel-container">
          <div className="flex space-x-6 animate-scroll">
            {doctors.map((doctor) =>
              doctor.user ? (
                <div
                  key={doctor._id}
                  // Added hover:scale-102, transition, transform, and cursor-pointer for interactive card effect
                  className="min-w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-102 transition duration-300 transform relative overflow-hidden group cursor-pointer"
                  onClick={() => fetchDoctorDetails(doctor.user._id)} // Made entire card clickable
                >
                  {/* Subtle overlay on hover to indicate interaction */}
                  <div className="absolute inset-0  opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                  <img
                    className="rounded-t-lg w-full h-56 object-cover"
                    src={doctor.profilePicture || "/Doctor.webp"}
                    alt={doctor.user.name}
                  />
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {doctor.user.name}
                    </h5>
                    <p className="text-blue-700 font-semibold text-sm mb-1">
                      {doctor.specialization || "Specialist"}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 text-sm">
                      {doctor.qualifications?.join(", ") || "Qualification"}<br />
                      {doctor.experience} years experience
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedDoctor && (
        <DoctorDetailsModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

      {/* Scroll Animation CSS and new hover effects */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 30s linear infinite;
          }

          /* New rule to pause animation on hover of the parent container */
          .carousel-container:hover .animate-scroll {
            animation-play-state: paused;
          }

          /* Hover effect for cards - escaped colon for Tailwind JIT compatibility */
          .hover\\:scale-102:hover {
            transform: scale(1.02);
          }

          /* Hover effect for button - escaped colon for Tailwind JIT compatibility */
          .hover\\:scale-105:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
};

export default Doctors;
