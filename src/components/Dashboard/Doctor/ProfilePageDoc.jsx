import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePageDoc = () => {
    const { id } = useParams(); // Get doctor ID from URL
    const [doctor, setDoctor] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({
        specialization: "",
        experience: 0,
        qualifications: [],
        certifications: [],
        workingDays: [],
    });
    const [error, setError] = useState(null);

    // Define fetchProfile using useCallback to avoid ESLint warning
    const fetchProfile = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:10/api/landingPage/doctor/${id}`
            );
            const data = await response.json();

            if (response.ok) {
                setDoctor(data);
                setUpdatedProfile({
                    specialization: data.specialization || "",
                    experience: data.experience || 0,
                    qualifications: data.qualifications || [],
                    certifications: data.certifications || [],
                    workingDays: data.workingDays || [],
                });
            } else {
                setError("Failed to load profile.");
            }
        } catch {
            setError("An error occurred while fetching profile data.");
        }
    }, [id]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // Handle profile update
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:10/api/doctor/Profile/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProfile),
                }
            );

            const data = await response.json();
            if (response.ok) {
                alert("Profile updated successfully!");
                setIsEditing(false);
                fetchProfile(); // Refresh profile
            } else {
                setError(data.error || "Failed to update profile.");
            }
        } catch {
            setError("An error occurred while updating the profile.");
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            {error && (
                <div className="bg-red-600 text-white p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            {doctor ? (
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {doctor.user ? doctor.user.name : "Doctor Profile"}
                    </h1>

                    <div className="space-y-4 text-lg">
                        <p>
                            <strong>Specialization:</strong>{" "}
                            {doctor.specialization || "N/A"}
                        </p>
                        <p>
                            <strong>Experience:</strong>{" "}
                            {doctor.experience || 0} years
                        </p>
                        <p>
                            <strong>Qualifications:</strong>{" "}
                            {doctor.qualifications.join(", ") || "N/A"}
                        </p>
                        <p>
                            <strong>Certifications:</strong>{" "}
                            {doctor.certifications.length
                                ? doctor.certifications.join(", ")
                                : "N/A"}
                        </p>
                        <p>
                            <strong>Working Days:</strong>{" "}
                            {doctor.workingDays.length
                                ? doctor.workingDays.join(", ")
                                : "N/A"}
                        </p>
                        <p>
                            <strong>Approval Status:</strong>{" "}
                            {doctor.isApproved ? "Approved" : "Not Approved"}
                        </p>
                        <p>
                            <strong>Rating:</strong>{" "}
                            {doctor.rating || "No ratings yet"}
                        </p>
                    </div>

                    {!isEditing ? (
                        <button
                            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                            onClick={() => setIsEditing(true)}
                        >
                            Update Profile
                        </button>
                    ) : (
                        <form
                            onSubmit={handleUpdateProfile}
                            className="mt-6 space-y-6"
                        >
                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    Specialization
                                </label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={updatedProfile.specialization}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    Experience (Years)
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={updatedProfile.experience}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    Qualifications
                                </label>
                                <input
                                    type="text"
                                    name="qualifications"
                                    value={updatedProfile.qualifications.join(
                                        ", "
                                    )}
                                    onChange={(e) =>
                                        setUpdatedProfile((prev) => ({
                                            ...prev,
                                            qualifications: e.target.value
                                                .split(",")
                                                .map((item) => item.trim()),
                                        }))
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    Certifications
                                </label>
                                <input
                                    type="text"
                                    name="certifications"
                                    value={updatedProfile.certifications.join(
                                        ", "
                                    )}
                                    onChange={(e) =>
                                        setUpdatedProfile((prev) => ({
                                            ...prev,
                                            certifications: e.target.value
                                                .split(",")
                                                .map((item) => item.trim()),
                                        }))
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    Working Days
                                </label>
                                <input
                                    type="text"
                                    name="workingDays"
                                    value={updatedProfile.workingDays.join(
                                        ", "
                                    )}
                                    onChange={(e) =>
                                        setUpdatedProfile((prev) => ({
                                            ...prev,
                                            workingDays: e.target.value
                                                .split(",")
                                                .map((item) => item.trim()),
                                        }))
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                            >
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <p className="text-xl">Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePageDoc;
