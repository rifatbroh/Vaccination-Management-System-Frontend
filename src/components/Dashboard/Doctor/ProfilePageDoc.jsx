import { useEffect, useState, useCallback } from "react";
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
                `http://localhost:10/api/doctor/Profile/${id}`
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
        <div className="profile-container">
            {error && <div className="error-message">{error}</div>}

            {doctor ? (
                <div>
                    <h1>{doctor.user ? doctor.user.name : "Doctor Profile"}</h1>
                    <div>
                        <p><strong>Specialization:</strong> {doctor.specialization || "N/A"}</p>
                        <p><strong>Experience:</strong> {doctor.experience || 0} years</p>
                        <p><strong>Qualifications:</strong> {doctor.qualifications.join(", ") || "N/A"}</p>
                        <p><strong>Certifications:</strong> {doctor.certifications.length ? doctor.certifications.join(", ") : "N/A"}</p>
                        <p><strong>Working Days:</strong> {doctor.workingDays.length ? doctor.workingDays.join(", ") : "N/A"}</p>
                        <p><strong>Approval Status:</strong> {doctor.isApproved ? "Approved" : "Not Approved"}</p>
                        <p><strong>Rating:</strong> {doctor.rating || "No ratings yet"}</p>
                    </div>

                    {!isEditing ? (
                        <button className="update-btn" onClick={() => setIsEditing(true)}>
                            Update Profile
                        </button>
                    ) : (
                        <form onSubmit={handleUpdateProfile}>
                            <div>
                                <label>Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={updatedProfile.specialization}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label>Experience (Years)</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={updatedProfile.experience}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label>Qualifications</label>
                                <input
                                    type="text"
                                    name="qualifications"
                                    value={updatedProfile.qualifications.join(", ")}
                                    onChange={(e) =>
                                        setUpdatedProfile((prev) => ({
                                            ...prev,
                                            qualifications: e.target.value
                                                .split(",")
                                                .map((item) => item.trim()),
                                        }))
                                    }
                                />
                            </div>

                            <div>
                                <label>Certifications</label>
                                <input
                                    type="text"
                                    name="certifications"
                                    value={updatedProfile.certifications.join(", ")}
                                    onChange={(e) =>
                                        setUpdatedProfile((prev) => ({
                                            ...prev,
                                            certifications: e.target.value
                                                .split(",")
                                                .map((item) => item.trim()),
                                        }))
                                    }
                                />
                            </div>

                            <div>
                                <label>Working Days</label>
                                <input
                                    type="text"
                                    name="workingDays"
                                    value={updatedProfile.workingDays.join(", ")}
                                    onChange={(e) =>
                                        setUpdatedProfile((prev) => ({
                                            ...prev,
                                            workingDays: e.target.value
                                                .split(",")
                                                .map((item) => item.trim()),
                                        }))
                                    }
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePageDoc;
