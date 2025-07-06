import axios from "axios";
import { useEffect, useState } from "react";

// Confirmation Modal component
const ConfirmRemoveModal = ({ userName, onCancel, onConfirm }) => (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm overflow-y-auto bg-opacity-50 z-50">
    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
      <p className="text-gray-700">
        Are you sure you want to remove <strong>{userName}</strong>? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

// Doctor Details Modal (unchanged)
const DoctorDetailsModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Doctor Details</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Name:</strong> {doctor.user?.name || "N/A"}</p>
          <p><strong>Email:</strong> {doctor.user?.email || "N/A"}</p>
          <p><strong>Specialization:</strong> {doctor.specialization || "N/A"}</p>
          <p><strong>Experience:</strong> {doctor.experience || "N/A"} years</p>
          <p><strong>Qualifications:</strong> {doctor.qualifications?.join(", ") || "N/A"}</p>
          <p><strong>Status:</strong> {doctor.isApproved ? "Approved" : "Not Approved"}</p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ApprovedDoctors = ({ refresh, onChange }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for confirmation modal
  const [doctorToRemove, setDoctorToRemove] = useState(null);

  const defaultProfileImage = "https://i.pinimg.com/736x/b7/e3/0e/b7e30e74daf4e6c6074e726b5ec2bb9e.jpg";

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

  const removeDoctor = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:10/api/admin/remove-doctor/${doctorId}`);
      // alert removed here to prevent multiple alerts
      fetchDoctors();
      onChange(); // Trigger parent refresh
    } catch (err) {
      console.error("Remove error:", err);
      setError("Failed to remove doctor.");
    } finally {
      setDoctorToRemove(null); // Close modal after action
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [refresh]);

  if (loading) return <div className="p-6 text-center">Loading doctors...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">Approved Doctors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length === 0 ? (
          <p>No approved doctors available.</p>
        ) : (
          doctors.map((doctor) =>
            doctor.user ? (
              <div
                key={doctor._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300"
              >
                <img
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-indigo-100 shadow"
                  src={doctor.profilePicture || defaultProfileImage}
                  alt={doctor.user.name}
                />
                <h5 className="text-xl font-semibold text-indigo-800 mb-1">
                  {doctor.user.name}
                </h5>
                <p className="text-sm text-gray-500 mb-4">
                  {doctor.specialization || "Specialization N/A"}
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => fetchDoctorDetails(doctor.user._id)}
                    className="cursor-pointer px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => setDoctorToRemove(doctor)}
                    className="px-4 py-2 border border-gray-300 text-sm rounded text-red-500 hover:bg-gray-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : null
          )
        )}
      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <DoctorDetailsModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

      {/* Confirmation Modal */}
      {doctorToRemove && (
        <ConfirmRemoveModal
          userName={doctorToRemove.user.name}
          onCancel={() => setDoctorToRemove(null)}
          onConfirm={() => removeDoctor(doctorToRemove.user._id)}
        />
      )}
    </div>
  );
};

export default ApprovedDoctors;
