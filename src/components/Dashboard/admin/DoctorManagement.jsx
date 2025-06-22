import { useEffect, useState } from "react";

// Dummy avatar fallback
const defaultAvatar = "https://via.placeholder.com/100?text=Doctor";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all doctors
  const fetchDoctors = () => {
    setLoading(true);
    fetch("http://localhost:10/api/landingPage/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch doctors:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Approve doctor
  const approveDoctor = async (id) => {
    try {
      const res = await fetch(`http://localhost:10/api/admin/approve-doctor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Doctor approved successfully.");
        fetchDoctors();
      } else {
        alert("Approval failed.");
      }
    } catch (error) {
      console.error("Error approving doctor:", error);
      alert("Error approving doctor.");
    }
  };

  // Remove doctor
  const removeDoctor = async (id) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this doctor?");
    if (!confirmRemove) return;

    try {
      const res = await fetch(`http://localhost:10/api/admin/remove-doctor/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Doctor removed successfully.");
        setDoctors((prev) => prev.filter((doc) => doc._id !== id));
      } else {
        alert("Failed to remove doctor.");
      }
    } catch (error) {
      console.error("Error removing doctor:", error);
      alert("Error removing doctor.");
    }
  };

  const renderDoctorCard = (doctor) => (
    <div
      key={doctor._id}
      className="bg-white shadow-md rounded-md p-4 flex flex-col items-center text-center"
    >
      <img
        src={doctor.photoUrl || defaultAvatar}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{doctor.name}</h2>
      <p className="text-gray-600">{doctor.email}</p>
      <p className={`mt-2 ${doctor.isApproved ? "text-green-600" : "text-red-500"}`}>
        {doctor.isApproved ? "Approved" : "Not Approved"}
      </p>

      <div className="mt-4 flex flex-col gap-2 w-full">
        {!doctor.isApproved && (
          <button
            onClick={() => approveDoctor(doctor._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Approve
          </button>
        )}
        <button
          onClick={() => removeDoctor(doctor._id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Remove
        </button>
      </div>
    </div>
  );

  const approvedDoctors = doctors.filter((doc) => doc.isApproved);
  const pendingDoctors = doctors.filter((doc) => !doc.isApproved);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Doctor Management</h1>

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <>
          {/* Approved Doctors */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">✅ Approved Doctors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {approvedDoctors.length > 0 ? (
                approvedDoctors.map(renderDoctorCard)
              ) : (
                <p>No approved doctors yet.</p>
              )}
            </div>
          </section>

          {/* Pending Approval */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">🛑 Pending Approvals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pendingDoctors.length > 0 ? (
                pendingDoctors.map(renderDoctorCard)
              ) : (
                <p>All doctors are approved.</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
