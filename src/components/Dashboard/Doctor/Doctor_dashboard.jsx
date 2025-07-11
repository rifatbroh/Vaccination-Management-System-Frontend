import { useEffect, useState } from "react";
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
                `http://localhost:0010/api/doctor/Profile/${id}` // ✅ Correct port
            );
            const data = await response.json();
            if (response.ok) {
                setDoctorProfile(data.doctorProfile || data);
                setError(null);
            } else {
                setError("Failed to load profile.");
            }
        } catch (error) {
            setError("Error fetching profile.");
            console.error(error);
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
        setError(null);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
        setEditingProfile(null);
        setError(null);
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
                .map((item) => item.trim())
                .filter((item) => item.length > 0),
            certifications: editingProfile.certifications
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item.length > 0),
            workingDays: editingProfile.workingDays
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item.length > 0),
        };

        try {
            const response = await fetch(
                `http://localhost:0010/api/doctor/updateProfile/${doctorProfile.user._id}`, // ✅ Use user._id
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ profile: updatedData }),
                }
            );

            if (response.ok) {
                alert("Profile updated!");
                closeProfileModal();
                fetchDoctorProfile();
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Update failed.");
                console.error("Update error:", errorData);
            }
        } catch (error) {
            setError("Error updating profile.");
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col mt-5 bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
            <main className="flex-1 p-4 md:p-10">
                <div className="max-w-7xl mx-auto">
                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {/* Appointments */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-blue-600 mb-3">
                                Upcoming Appointments
                            </h3>
                            <p className="text-gray-600">
                                You have 5 appointments scheduled.
                            </p>
                            <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                                View All
                            </button>
                        </div>

                        {/* New Patients */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-green-600 mb-3">
                                New Patients
                            </h3>
                            <p className="text-gray-600">
                                3 new patients registered today.
                            </p>
                            <button className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                                Manage Patients
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-purple-600 mb-3">
                                Messages
                            </h3>
                            <p className="text-gray-600">
                                You have 2 unread messages.
                            </p>
                            <button className="mt-4 px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm">
                                Read Messages
                            </button>
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white p-6 md:p-10 rounded-3xl mt-10 shadow-xl border hover:shadow-2xl">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 text-md">
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {doctorProfile.user?.name || "N/A"}
                                </p>
                                <p>
                                    <strong>Specialization:</strong>{" "}
                                    {doctorProfile.specialization || "N/A"}
                                </p>
                                <p>
                                    <strong>Experience:</strong>{" "}
                                    {doctorProfile.experience} years
                                </p>
                                <p>
                                    <strong>Qualifications:</strong>{" "}
                                    {doctorProfile.qualifications?.join(", ") ||
                                        "N/A"}
                                </p>
                                <p>
                                    <strong>Certifications:</strong>{" "}
                                    {doctorProfile.certifications?.join(", ") ||
                                        "N/A"}
                                </p>
                                <p>
                                    <strong>Working Days:</strong>{" "}
                                    {doctorProfile.workingDays?.join(", ") ||
                                        "N/A"}
                                </p>
                                <p>
                                    <strong>Approval Status:</strong>{" "}
                                    <span
                                        className={
                                            doctorProfile.isApproved
                                                ? "text-green-600 font-bold"
                                                : "text-red-600 font-bold"
                                        }
                                    >
                                        {doctorProfile.isApproved
                                            ? "Approved"
                                            : "Not Approved"}
                                    </span>
                                </p>
                                <p>
                                    <strong>Rating:</strong>{" "}
                                    {doctorProfile.rating || "No rating yet"}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-600">Loading profile...</p>
                        )}

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={openProfileModal}
                                className="cursor-pointer flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700"
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

            {/* Modal */}
            {isProfileModalOpen && editingProfile && (
                <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto flex justify-center items-center z-50 p-4">
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
                            placeholder="Qualifications (comma separated)"
                            value={editingProfile.qualifications}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            name="certifications"
                            placeholder="Certifications (comma separated)"
                            value={editingProfile.certifications}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            name="workingDays"
                            placeholder="Working Days (comma separated)"
                            value={editingProfile.workingDays}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={closeProfileModal}
                                className="cursor-pointer px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded"
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
