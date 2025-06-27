import axios from "axios";
import { useEffect, useState } from "react";

// Doctor Details Modal
const DoctorDetailsModal = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm overflow-y-auto">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Doctor Details</h2>
                <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Name:</strong> {doctor.user?.name || "N/A"}</p>
                    <p><strong>Email:</strong> {doctor.user?.email || "N/A"}</p>
                    <p><strong>Specialization:</strong> {doctor.specialization || "N/A"}</p>
                    <p><strong>Experience:</strong> {doctor.experience || "N/A"} years</p>
                    <p><strong>Qualifications:</strong> {doctor.qualifications?.join(", ") || "N/A"}</p>
                    <p><strong>Status:</strong> {doctor.isApproved ? "Approved" : "Not Approved"}</p>
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

    const removeDoctor = async (doctorId) => {
        try {
            const res = await axios.delete(`http://localhost:10/api/admin/remove-doctor/${doctorId}`);
            alert(res.data.message || "Doctor removed.");
            fetchDoctors();
        } catch (err) {
            console.error("Remove error:", err);
            setError("Failed to remove doctor.");
        }
    };

    // const toggleDropdown = (id) => {
    //     setDropdownOpen(dropdownOpen === id ? null : id);
    // };

    useEffect(() => {
        fetchDoctors();

    }, []);

    if (loading) return <div className="p-6">Loading doctors...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Approved Doctors</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.length === 0 ? (
                    <p>No approved doctors available.</p>
                ) : (
                    doctors.map((doctor) =>
                        doctor.user ? (
                            <div
                                key={doctor._id}
                                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm relative"
                            >

                                {/* Profile */}
                                <div className="flex flex-col items-center pb-10 px-4">
                                    <img
                                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                        src={doctor.profilePicture || "/Doctor.webp"}
                                        alt={doctor.user.name}
                                    />
                                    <h5 className="mb-1 text-xl font-medium text-gray-900">
                                        {doctor.user.name}
                                    </h5>
                                    <span className="text-sm text-gray-500">
                                        {doctor.specialization || "N/A"}
                                    </span>

                                    <div className="flex mt-4 md:mt-6">
                                        <button
                                            onClick={() => fetchDoctorDetails(doctor.user._id)}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            onClick={() => removeDoctor(doctor.user._id)}
                                            className="ml-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    )
                )}
            </div>

            {/* Modal */}
            {selectedDoctor && (
                <DoctorDetailsModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
            )}
        </div>
    );
};

export default ApprovedDoctors;
