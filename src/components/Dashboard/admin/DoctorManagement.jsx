import { useEffect, useState } from "react";
import { FaCheck, FaTrash, FaUserCheck } from "react-icons/fa";

// Dummy avatar fallback
const defaultAvatar = "https://via.placeholder.com/100?text=Doctor";

export default function DoctorManagement() {
  const [allDoctors, setAllDoctors] = useState([]);  // All doctors (approved + unapproved)
  const [pendingDoctors, setPendingDoctors] = useState([]); // Only unapproved doctors
  const [loading, setLoading] = useState(true);

  // Fetch all doctors (approved + unapproved) from the endpoint
  const fetchAllDoctors = () => {
    setLoading(true);
    fetch("http://localhost:10/api/landingPage/doctors")  // All doctors endpoint
      .then((res) => res.json())
      .then((data) => {
        setAllDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch doctors:", err);
        setLoading(false);
      });
  };

  // Fetch unapproved doctors (for management purposes)
  const fetchPendingDoctors = () => {
    setLoading(true);
    fetch("http://localhost:10/api/admin/unapproved-doctors")  // Unapproved doctors endpoint
      .then((res) => res.json())
      .then((data) => {
        setPendingDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch unapproved doctors:", err);
        setLoading(false);
      });
  };

  // Approve a doctor
  const approveDoctor = async (id) => {
    try {
      const res = await fetch(`http://localhost:10/api/admin/approve-doctor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Doctor approved successfully.");
        fetchPendingDoctors();  // Re-fetch unapproved doctors
        fetchAllDoctors();      // Re-fetch all doctors
      } else {
        alert("Approval failed.");
      }
    } catch (error) {
      console.error("Error approving doctor:", error);
      alert("Error approving doctor.");
    }
  };

  // Remove a doctor
  const removeDoctor = async (id) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this doctor?");
    if (!confirmRemove) return;

    try {
      const res = await fetch(`http://localhost:10/api/admin/remove-doctor/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Doctor removed successfully.");
        setAllDoctors((prev) => prev.filter((doc) => doc._id !== id));  // Update the all doctors list
        setPendingDoctors((prev) => prev.filter((doc) => doc._id !== id)); // Update the pending list
      } else {
        alert("Failed to remove doctor.");
      }
    } catch (error) {
      console.error("Error removing doctor:", error);
      alert("Error removing doctor.");
    }
  };

  // Render each doctor's card
  const renderDoctorCard = (doctor) => (
    <div
      key={doctor._id}
      className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center border border-gray-200"
    >
      <img
        src={doctor.photoUrl || defaultAvatar}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-blue-500"
      />
      <h2 className="text-xl font-semibold mb-1">{doctor.name}</h2>
      <p className="text-gray-500 text-sm mb-2">{doctor.email}</p>
      <p
        className={`text-sm font-medium mb-4 px-3 py-1 rounded-full ${
          doctor.isApproved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
        }`}
      >
        {doctor.isApproved ? "Approved" : "Not Approved"}
      </p>

      <div className="flex gap-3 w-full">
        {!doctor.isApproved && (
          <button
            onClick={() => approveDoctor(doctor._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaCheck />
            Approve
          </button>
        )}
        <button
          onClick={() => removeDoctor(doctor._id)}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          <FaTrash />
          Remove
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    fetchAllDoctors();    // Fetch all doctors on initial load
    fetchPendingDoctors();  // Fetch pending (unapproved) doctors
  }, []);

  return (
    <div className="p-6 from-blue-50 to-gray-100 ">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Doctor Management</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading doctors...</p>
      ) : (
        <>
          {/* All Doctors (Approved & Pending) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
              <FaUserCheck /> All Doctors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allDoctors.length > 0 ? (
                allDoctors.map(renderDoctorCard)
              ) : (
                <p className="text-gray-500">No doctors found.</p>
              )}
            </div>
          </section>

          {/* Pending Approval (Unapproved Doctors) */}
          <section>
            <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
              🛑 Pending Approvals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pendingDoctors.length > 0 ? (
                pendingDoctors.map(renderDoctorCard)
              ) : (
                <p className="text-gray-500">No pending doctors for approval.</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
