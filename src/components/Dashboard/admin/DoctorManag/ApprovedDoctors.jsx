import axios from "axios";
import { useEffect, useState } from "react";

// Modal to show doctor details
const DoctorDetailsModal = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-2xl font-bold mb-4">Doctor Details</h2>
                <div>
                    <p>
                        <strong>Name:</strong> {doctor.user?.name || "N/A"}
                    </p>
                    <p>
                        <strong>Email:</strong> {doctor.user?.email || "N/A"}
                    </p>
                    <p>
                        <strong>Specialization:</strong>{" "}
                        {doctor.specialization || "N/A"}
                    </p>
                    <p>
                        <strong>Experience:</strong>{" "}
                        {doctor.experience || "N/A"} years
                    </p>
                    <p>
                        <strong>Qualifications:</strong>{" "}
                        {doctor.qualifications?.join(", ") || "N/A"}
                    </p>
                    <p>
                        <strong>Approval Status:</strong>{" "}
                        {doctor.isApproved ? "Approved" : "Not Approved"}
                    </p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const ApprovedDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch all approved doctors
    const fetchDoctors = async () => {
        try {
            const response = await axios.get(
                "http://localhost:10/api/landingPage/doctors"
            );
            setDoctors(response.data); // Store the approved doctors in state
        } catch (error) {
            console.error("Error fetching doctors:", error);
            setError("Failed to fetch doctors. Please try again later.");
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Fetch doctor details
    const fetchDoctorDetails = async (doctorId) => {
        try {
            const response = await axios.get(
                `http://localhost:10/api/landingPage/doctor/${doctorId}`
            );
            setSelectedDoctor(response.data); // Set the detailed information of the doctor
        } catch (error) {
            console.error("Error fetching doctor details:", error);
            setError("Failed to fetch doctor details. Please try again later.");
        }
    };

    // Remove a doctor
    const removeDoctor = async (doctorId) => {
        try {
            const response = await axios.delete(
                `http://localhost:10/api/admin/remove-doctor/${doctorId}`
            );
            alert(response.data.message || "Doctor removed successfully!");
            fetchDoctors(); // Refresh the list after removal
        } catch (error) {
            console.error("Error removing doctor:", error);
            setError("Failed to remove doctor. Please try again later.");
        }
    };

    // Open the profile modal
    const openProfile = (doctorId) => {
        fetchDoctorDetails(doctorId); // Fetch and display the doctor details
    };

    // Close the profile modal
    const closeProfile = () => {
        setSelectedDoctor(null); // Close the modal
    };

    useEffect(() => {
        fetchDoctors(); // Fetch doctors on component mount
    }, []);

    // If loading, show loading message
    if (loading) {
        return <div>Loading doctors...</div>;
    }

    // If there's an error, display the error message
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Approved Doctors</h1>

            {/* Doctors List - Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.length === 0 ? (
                    <p>No approved doctors available.</p>
                ) : (
                    doctors.map((doctor) => {
                        // Check if doctor.user exists
                        if (!doctor.user) return null; // Skip if no user data
                        return (
                            <div
                                key={doctor._id} // Use doctor._id if it's a valid unique identifier
                                className="bg-white border shadow-lg rounded-lg p-4"
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        src={
                                            doctor.profilePicture ||
                                            "../../../../../public/Doctor.webp"
                                        }
                                        alt={doctor.user?.name}
                                        className="w-32 h-32 rounded-full mb-4"
                                    />
                                    <h2 className="text-xl font-semibold text-center">
                                        {doctor.user?.name || "Unknown Name"}
                                    </h2>
                                    <p className="text-sm text-center text-gray-500">
                                        Specialization:{" "}
                                        {doctor.specialization || "N/A"}
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={
                                            () => openProfile(doctor._id) // Use doctor._id
                                        }
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        View Profile
                                    </button>
                                    <button
                                        onClick={
                                            () => removeDoctor(doctor._id) // Use doctor._id
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Doctor Details Modal */}
            {selectedDoctor && (
                <DoctorDetailsModal
                    doctor={selectedDoctor}
                    onClose={closeProfile}
                />
            )}
        </div>
    );
};

export default ApprovedDoctors;
