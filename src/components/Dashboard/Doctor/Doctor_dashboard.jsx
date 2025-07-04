import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Doctor_dashboard = () => {
  const { id } = useParams();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctorProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:10/api/doctor/Profile/${id}`
      );
      const data = await response.json();
      if (response.ok) {
        setDoctorProfile(data);
      } else {
        setError("Failed to load profile.");
      }
    } catch {
      setError("Error fetching profile.");
    }
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, [id]);

  const openProfileModal = () => {
    setEditingProfile({
      specialization: doctorProfile.specialization || "",
      experience: doctorProfile.experience || 0,
      qualifications: doctorProfile.qualifications?.join(", ") || "",
      certifications: doctorProfile.certifications?.join(", ") || "",
      workingDays: doctorProfile.workingDays?.join(", ") || "",
    });
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setEditingProfile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const updatedData = {
      specialization: editingProfile.specialization,
      experience: Number(editingProfile.experience),
      qualifications: editingProfile.qualifications
        .split(",")
        .map((item) => item.trim()),
      certifications: editingProfile.certifications
        .split(",")
        .map((item) => item.trim()),
      workingDays: editingProfile.workingDays
        .split(",")
        .map((item) => item.trim()),
    };

    try {
      const response = await fetch(
        `http://localhost:10/api/doctor/Profile/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert("Profile updated!");
        setIsProfileModalOpen(false);
        fetchDoctorProfile();
      } else {
        setError("Update failed.");
      }
    } catch {
      setError("Error updating profile.");
    }
  };

  return (
    <div className="flex flex-col mt-5 bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">

      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* CARD SECTION (Same as your screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Upcoming Appointments
              </h3>
              <p className="text-gray-600">
                You have 5 appointments scheduled.
              </p>
              <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm">
                View All
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-semibold text-green-600 mb-3">
                New Patients
              </h3>
              <p className="text-gray-600">3 new patients registered today.</p>
              <button className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 text-sm">
                Manage Patients
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-semibold text-purple-600 mb-3">
                Messages
              </h3>
              <p className="text-gray-600">You have 2 unread messages.</p>
              <button className="mt-4 px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200 text-sm">
                Read Messages
              </button>
            </div>
          </div>

          {/* PROFILE SECTION */}
          <div className="bg-white p-6 md:p-10 rounded-3xl mt-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 110-8 4 4 0 010 8z" />
              </svg>
              Your Profile Overview
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            {doctorProfile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-gray-800 text-md">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {doctorProfile.user?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Certifications:</span>{" "}
                  {doctorProfile.certifications?.join(", ") || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Specialization:</span>{" "}
                  {doctorProfile.specialization || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Working Days:</span>{" "}
                  {doctorProfile.workingDays?.join(", ") || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Experience:</span>{" "}
                  {doctorProfile.experience} years
                </p>
                <p>
                  <span className="font-semibold">Approval Status:</span>{" "}
                  <span className="text-green-600 font-bold">
                    {doctorProfile.isApproved ? "Approved" : "Not Approved"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Qualifications:</span>{" "}
                  {doctorProfile.qualifications?.join(", ") || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Rating:</span>{" "}
                  {doctorProfile.rating || "No rating yet"}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">Loading profile...</p>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={openProfileModal}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                Update Your Profile
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {isProfileModalOpen && editingProfile && (
        <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto bg-opacity-50 flex justify-center items-center z-50 p-4">
          <form
            onSubmit={handleSaveChanges}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4"
          >
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              name="specialization"
              placeholder="Specialization"
              value={editingProfile.specialization}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="experience"
              placeholder="Experience"
              value={editingProfile.experience}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="qualifications"
              placeholder="Qualifications"
              value={editingProfile.qualifications}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="certifications"
              placeholder="Certifications"
              value={editingProfile.certifications}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="workingDays"
              placeholder="Working Days"
              value={editingProfile.workingDays}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeProfileModal}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Doctor_dashboard;
