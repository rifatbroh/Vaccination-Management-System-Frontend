import axios from "axios";
import { useEffect, useState } from "react";

const DoctorApprovalDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [expandedDoctorId, setExpandedDoctorId] = useState(null);
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
            setDoctors((prev) =>
                prev.map((doc) =>
                    doc.user._id === userId ? { ...res.data } : doc
                )
            );
            setExpandedDoctorId(userId);
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
        } catch (err) {
            console.error("Error approving doctor:", err);
        }
    };

    const removeDoctor = async (userId) => {
        try {
            await axios.delete(
                `http://localhost:10/api/remove-doctor/${userId}`
            );
            alert("Doctor removed");
            fetchUnapprovedDoctors();
        } catch (err) {
            console.error("Error removing doctor:", err);
        }
    };

    useEffect(() => {
        fetchUnapprovedDoctors();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Unapproved Doctors
            </h2>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <div
                            key={doc.user._id}
                            className="bg-white rounded-lg shadow p-5 space-y-4"
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
                                        expandedDoctorId === doc.user._id
                                            ? setExpandedDoctorId(null)
                                            : fetchDoctorDetails(doc.user._id)
                                    }
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    {expandedDoctorId === doc.user._id
                                        ? "Hide Details"
                                        : "Show Details"}
                                </button>
                                <button
                                    onClick={() => approveDoctor(doc.user._id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => removeDoctor(doc.user._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>

                            {expandedDoctorId === doc.user._id && (
                                <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
                                    <p>
                                        <strong>Specialization:</strong>{" "}
                                        {doc.specialization}
                                    </p>
                                    <p>
                                        <strong>Experience:</strong>{" "}
                                        {doc.experience} years
                                    </p>
                                    <p>
                                        <strong>Qualifications:</strong>{" "}
                                        {doc.qualifications?.join(", ") ||
                                            "N/A"}
                                    </p>
                                    <p>
                                        <strong>Rating:</strong> {doc.rating}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorApprovalDashboard;
