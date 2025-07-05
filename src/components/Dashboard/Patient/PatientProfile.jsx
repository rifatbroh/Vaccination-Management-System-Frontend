// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   FaUserAlt,
//   FaEnvelope,
//   FaBirthdayCake,
//   FaUserTag,
//   FaNotesMedical,
// } from "react-icons/fa";

// const PatientProfileWithMedicalHistory = () => {
//   const { id: userId } = useParams();

//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchPatientProfile = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`http://localhost:10/api/patient/getprofile/${userId}`);
//         setPatient(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch patient profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientProfile();
//   }, [userId]);

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (error) return <div className="p-6 text-red-600">{error}</div>;
//   if (!patient) return <div className="p-6 text-red-600">Patient data is unavailable.</div>;

//   const { user, dateOfBirth, medicalHistory } = patient;
//   const userName = user?.name || "N/A";
//   const userEmail = user?.email || "N/A";
//   const userRole = user?.role || "N/A";

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl duration-300">
//         {/* Left: Basic Info */}
//         <div className="w-full md:w-2/3 p-6 bg-gradient-to-br from-blue-50 to-purple-100">
//           <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//             <FaUserAlt className="text-blue-500" />
//             {userName}
//           </h2>
//           <ul className="space-y-3 text-gray-700 text-sm">
//             <li className="flex items-center gap-2">
//               <FaEnvelope className="text-blue-400" />
//               <span><strong>Email:</strong> {userEmail}</span>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaUserTag className="text-blue-400" />
//               <span><strong>Role:</strong> {userRole}</span>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaBirthdayCake className="text-blue-400" />
//               <span>
//                 <strong>DOB:</strong>{" "}
//                 {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : "Date of Birth not available"}
//               </span>
//             </li>
//           </ul>
//         </div>

//         {/* Right: Button */}
//         <div className="w-full md:w-1/3 flex items-center justify-center bg-white p-6">
//           <button
//             onClick={() => setShowHistory(true)}
//             className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-full flex items-center gap-2 text-sm shadow-lg transition"
//           >
//             <FaNotesMedical />
//             View Medical History
//           </button>
//         </div>
//       </div>

//       {/* Slide-In Modal */}
//       {showHistory && (
//         <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm overflow-y-auto bg-black bg-opacity-30 transition duration-300">
//           <div className="w-full sm:w-[90%] md:w-[500px] bg-white p-6 shadow-2xl overflow-y-auto max-h-screen relative animate-slide-in-right">
//             <button
//               onClick={() => setShowHistory(false)}
//               className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
//             >
//               &times;
//             </button>

//             <h2 className="text-2xl font-semibold text-purple-700 mb-4">Medical History</h2>

//             {/* Allergies */}
//             {medicalHistory?.allergies?.length > 0 ? (
//               <div className="mb-4">
//                 <h3 className="font-medium text-gray-800">Allergies</h3>
//                 <ul className="list-disc pl-5 text-sm text-gray-600">
//                   {medicalHistory.allergies.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm mb-4">No allergies recorded.</p>
//             )}

//             {/* Chronic Diseases */}
//             {medicalHistory?.chronicDiseases?.length > 0 ? (
//               <div className="mb-4">
//                 <h3 className="font-medium text-gray-800">Chronic Diseases</h3>
//                 <ul className="list-disc pl-5 text-sm text-gray-600">
//                   {medicalHistory.chronicDiseases.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm mb-4">No chronic diseases recorded.</p>
//             )}

//             {/* Medications */}
//             {medicalHistory?.medications?.length > 0 ? (
//               <div className="mb-4">
//                 <h3 className="font-medium text-gray-800">Medications</h3>
//                 <ul className="list-disc pl-5 text-sm text-gray-600">
//                   {medicalHistory.medications.map((m, index) => (
//                     <li key={index}>
//                       <strong>{m.name}</strong> – {m.dosage} ({m.frequency})
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm mb-4">No medications recorded.</p>
//             )}

//             {/* Vaccination History */}
//             {medicalHistory?.vaccinationHistory?.length > 0 ? (
//               <div className="mb-4">
//                 <h3 className="font-medium text-gray-800">Vaccination History</h3>
//                 <ul className="list-disc pl-5 text-sm text-gray-600">
//                   {medicalHistory.vaccinationHistory.map((v, index) => (
//                     <li key={index}>
//                       <strong>{v.vaccine?.name || "Unknown vaccine"}</strong> –{" "}
//                       {v.date ? new Date(v.date).toLocaleDateString() : "N/A"}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm mb-4">No vaccination history recorded.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientProfileWithMedicalHistory;
import axios from "axios";
import { useEffect, useState } from "react";
import {
    FaBirthdayCake,
    FaEnvelope,
    FaNotesMedical,
    FaUserAlt,
    FaUserTag,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const PatientProfileAndMedicalHistory = () => {
    const { id: userId } = useParams();

    const [patient, setPatient] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const [profileRes, historyRes] = await Promise.all([
                    axios.get(
                        `http://localhost:10/api/patient/getprofile/${userId}`
                    ),
                    axios.get(
                        `http://localhost:10/api/patient/medical-history/${userId}`
                    ),
                ]);

                setPatient(profileRes.data);
                setMedicalHistory(historyRes.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch patient data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading)
        return <div className="p-6 text-center text-gray-500">Loading...</div>;
    if (error)
        return <div className="p-6 text-red-600 text-center">{error}</div>;
    if (!patient)
        return (
            <div className="p-6 text-red-600 text-center">
                Patient data unavailable.
            </div>
        );

    const { user, dateOfBirth } = patient;
    const userName = user?.name || "N/A";
    const userEmail = user?.email || "N/A";
    const userRole = user?.role || "N/A";

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Patient Info Card */}
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl duration-300 mb-8">
                <div className="w-full md:w-full p-6 bg-gradient-to-br from-blue-50 to-purple-100">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <FaUserAlt className="text-blue-500" />
                        {userName}
                    </h2>
                    <ul className="space-y-3 text-gray-700 text-sm">
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-400" />
                            <span>
                                <strong>Email:</strong> {userEmail}
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaUserTag className="text-blue-400" />
                            <span>
                                <strong>Role:</strong> {userRole}
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaBirthdayCake className="text-blue-400" />
                            <span>
                                <strong>DOB:</strong>{" "}
                                {dateOfBirth
                                    ? new Date(dateOfBirth).toLocaleDateString()
                                    : "Date of Birth not available"}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Medical History */}
            <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold text-purple-700 mb-6 flex items-center gap-2">
                    <FaNotesMedical />
                    Medical History
                </h2>

                {/* Allergies */}
                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                        Allergies
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {medicalHistory?.allergies?.length ? (
                            medicalHistory.allergies.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))
                        ) : (
                            <li className="italic text-gray-400">None</li>
                        )}
                    </ul>
                </section>

                {/* Chronic Diseases */}
                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                        Chronic Diseases
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {medicalHistory?.chronicDiseases?.length ? (
                            medicalHistory.chronicDiseases.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))
                        ) : (
                            <li className="italic text-gray-400">None</li>
                        )}
                    </ul>
                </section>

                {/* Medications */}
                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                        Medications
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {medicalHistory?.medications?.length ? (
                            medicalHistory.medications.map(
                                ({ name, dosage, frequency }, i) => (
                                    <li key={i}>
                                        <strong>{name}</strong> — {dosage} —{" "}
                                        {frequency}
                                    </li>
                                )
                            )
                        ) : (
                            <li className="italic text-gray-400">None</li>
                        )}
                    </ul>
                </section>

                {/* Vaccination History */}
                <section>
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                        Vaccination History
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {medicalHistory?.vaccinationHistory?.length ? (
                            medicalHistory.vaccinationHistory.map(
                                ({ vaccine, date }, i) => (
                                    <li key={i}>
                                        {vaccine?.name || "Unknown vaccine"} —{" "}
                                        {date
                                            ? new Date(
                                                  date
                                              ).toLocaleDateString()
                                            : "Date unavailable"}
                                    </li>
                                )
                            )
                        ) : (
                            <li className="italic text-gray-400">None</li>
                        )}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default PatientProfileAndMedicalHistory;
