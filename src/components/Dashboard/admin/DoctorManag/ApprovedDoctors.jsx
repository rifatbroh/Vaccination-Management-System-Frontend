import axios from "axios";
import { useEffect, useState } from "react";

// Confirm delete modal
const ConfirmRemoveModal = ({ userName, onCancel, onConfirm }) => (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-red-600">
                Confirm Deletion
            </h3>
            <p className="text-gray-700 mt-2">
                Are you sure you want to remove <strong>{userName}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onCancel} className="px-3 py-1 border rounded">
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                >
                    Remove
                </button>
            </div>
        </div>
    </div>
);

// Doctor detail modal
const DoctorDetailsModal = ({ doctor, onClose }) => (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
        <div
            className="bg-white p-6 rounded-xl shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">
                Doctor Details
            </h2>
            <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Name:</strong> {doctor.user?.name}</p>
                <p><strong>Email:</strong> {doctor.user?.email}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Experience:</strong> {doctor.experience} years</p>
                <p><strong>Qualifications:</strong> {doctor.qualifications?.join(", ")}</p>
                <p><strong>Status:</strong> {doctor.isApproved ? "Approved" : "Pending"}</p>
            </div>
            <div className="mt-6 text-right">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

// Main Component
const ApprovedDoctors = ({ refresh, onChange }) => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorToRemove, setDoctorToRemove] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDoctors = async () => {
        try {
            const res = await axios.get("http://localhost:10/api/landingPage/doctors");
            setDoctors(res.data);
        } catch (err) {
            console.error("Error fetching approved doctors:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:10/api/landingPage/doctor/${id}`);
            setSelectedDoctor(res.data);
        } catch (err) {
            console.error("Error fetching doctor:", err);
        }
    };

    const removeDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:10/api/admin/remove-doctor/${id}`);
            onChange(); // Notify parent to refresh both lists
        } catch (err) {
            console.error("Error removing doctor:", err);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [refresh]);

    if (loading) {
        return <div className="p-6 text-center">Loading doctors...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
                Approved Doctors
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc) =>
                    doc.user ? (
                        <div
                            key={doc._id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border text-center"
                        >
                            <img
                                src={
                                    doc.profilePicture?.trim()
                                        ? doc.profilePicture
                                        : "https://i.pinimg.com/736x/fd/40/ac/fd40aca2ad6f04a772967925760dccab.jpg"
                                }
                                alt={doc.user.name}
                                className="w-24 h-24 mx-auto rounded-full border border-indigo-200 mb-4"
                            />
                            <h4 className="text-lg font-bold text-indigo-800">
                                Dr. {doc.user.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {doc.specialization || "General Physician"}
                            </p>
                            <div className="flex justify-center gap-3 mt-4">
                                <button
                                    onClick={() => fetchDoctorDetails(doc.user._id)}
                                    className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    View Profile
                                </button>
                                <button
                                    onClick={() => setDoctorToRemove(doc)}
                                    className="px-4 py-1.5 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : null
                )}
            </div>

            {/* Modals */}
            {selectedDoctor && (
                <DoctorDetailsModal
                    doctor={selectedDoctor}
                    onClose={() => setSelectedDoctor(null)}
                />
            )}
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
