import axios from "axios";
import { useEffect, useState } from "react";

// Patient Profile Component
const PatientProfile = ({ id }) => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch patient profile by ID
    useEffect(() => {
        const fetchPatientProfile = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:10/api/patient/getprofile/${id}`
                );
                setPatient(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch patient profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatientProfile();
    }, [id]);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">
                Patient Profile
            </h1>

            {/* User Information */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Personal Information
                </h2>
                <div className="mt-4">
                    <p className="text-sm text-gray-600">
                        <strong>Name:</strong> {patient.user.name}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Email:</strong> {patient.user.email}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Role:</strong> {patient.user.role}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Date of Birth:</strong>{" "}
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Medical History */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Medical History
                </h2>

                {/* Allergies */}
                {patient.medicalHistory?.allergies &&
                    patient.medicalHistory.allergies.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Allergies:
                            </h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {patient.medicalHistory.allergies.map(
                                    (allergy, index) => (
                                        <li key={index}>{allergy}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                {/* Chronic Diseases */}
                {patient.medicalHistory?.chronicDiseases &&
                    patient.medicalHistory.chronicDiseases.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Chronic Diseases:
                            </h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {patient.medicalHistory.chronicDiseases.map(
                                    (disease, index) => (
                                        <li key={index}>{disease}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                {/* Medications */}
                {patient.medicalHistory?.medications &&
                    patient.medicalHistory.medications.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Medications:
                            </h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {patient.medicalHistory.medications.map(
                                    (med, index) => (
                                        <li key={index}>
                                            <strong>{med.name}</strong> -{" "}
                                            {med.dosage} ({med.frequency})
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                {/* Vaccination History */}
                {patient.medicalHistory?.vaccinationHistory &&
                    patient.medicalHistory.vaccinationHistory.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Vaccination History:
                            </h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {patient.medicalHistory.vaccinationHistory.map(
                                    (vaccine, index) => (
                                        <li key={index}>
                                            <strong>
                                                {vaccine.vaccine.name}
                                            </strong>{" "}
                                            -{" "}
                                            {new Date(
                                                vaccine.date
                                            ).toLocaleDateString()}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default PatientProfile;
