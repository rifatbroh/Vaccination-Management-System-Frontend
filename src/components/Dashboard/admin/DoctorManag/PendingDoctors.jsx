import axios from "axios";
import { useEffect, useState } from "react";

const DoctorApprovalDashboard = ({ refresh, onChange }) => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUnapprovedDoctors = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:10/api/admin/unapproved-doctors"
            );
            setDoctors(res.data);
        } catch (err) {
            console.error("Error fetching doctors:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorDetails = async (userId) => {
        try {
            const res = await axios.get(
                `http://localhost:10/api/landingPage/doctor/${userId}`
            );
            setSelectedDoctor(res.data);
        } catch (err) {
            console.error("Error fetching doctor details:", err);
        }
    };

    const approveDoctor = async (userId) => {
        try {
            await axios.put(
                `http://localhost:10/api/admin/approve-doctor/${userId}`
            );
            alert("Doctor approved");
            fetchUnapprovedDoctors();
            onChange(); // Notify parent to trigger refresh
        } catch (err) {
            console.error("Error approving doctor:", err);
        }
    };

    const removeDoctor = async (userId) => {
        try {
            await axios.delete(
                `http://localhost:10/api/admin/remove-doctor/${userId}`
            );
            alert("Doctor removed");
            fetchUnapprovedDoctors();
            onChange(); // Notify parent to trigger refresh
        } catch (err) {
            console.error("Error removing doctor:", err);
        }
    };

    const closeModal = () => {
        setSelectedDoctor(null);
    };

    useEffect(() => {
        fetchUnapprovedDoctors(); // Fetch doctors whenever refresh changes
    }, [refresh]); // Re-run whenever `refresh` changes

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Pending Approval
            </h2>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <div
                            key={doc.user._id}
                            className="bg-white border-1 border-gray-100 rounded-lg shadow p-5 space-y-4"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {doc.user.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {doc.user.email}
                                </p>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() =>
                                        fetchDoctorDetails(doc.user._id)
                                    }
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                                >
                                    Show Details
                                </button>
                                <button
                                    onClick={() => approveDoctor(doc._id)}
                                    className="bg-[#469b7e] text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => removeDoctor(doc._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {selectedDoctor && (
                <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white border-gray-100 border-2 p-6 rounded-md w-96 relative">
                        <h2 className="text-2xl font-bold mb-4">
                            Doctor Details
                        </h2>
                        <div className="space-y-2 text-gray-700 text-sm">
                            <p>
                                <strong>Name:</strong>{" "}
                                {selectedDoctor.user?.name || "N/A"}
                            </p>
                            <p>
                                <strong>Email:</strong>{" "}
                                {selectedDoctor.user?.email || "N/A"}
                            </p>
                            <p>
                                <strong>Specialization:</strong>{" "}
                                {selectedDoctor.specialization || "N/A"}
                            </p>
                            <p>
                                <strong>Experience:</strong>{" "}
                                {selectedDoctor.experience || "N/A"} years
                            </p>
                            <p>
                                <strong>Qualifications:</strong>{" "}
                                {selectedDoctor.qualifications?.join(", ") ||
                                    "N/A"}
                            </p>
                            <p>
                                <strong>Approval Status:</strong>{" "}
                                {selectedDoctor.isApproved
                                    ? "Approved"
                                    : "Not Approved"}
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorApprovalDashboard;
