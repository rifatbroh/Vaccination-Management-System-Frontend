import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaUserAlt,
  FaUserTag,
  FaNotesMedical,
  FaAllergies,
  FaDisease,
  FaPills,
  FaSyringe,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const PatientProfile = () => {
  const { id: userId } = useParams();
  const [patient, setPatient] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fadeIn = useSpring({
    opacity: medicalHistory === null && !loading && !error ? 1 : 0,
    transform:
      medicalHistory === null && !loading && !error
        ? "translateY(0px)"
        : "translateY(-20px)",
    config: { duration: 600, tension: 200, friction: 20 },
  });

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const profileRes = await axios.get(
          `http://localhost:10/api/patient/getprofile/${userId}`
        );
        setPatient(profileRes.data);

        const historyRes = await fetch(
          `http://localhost:10/api/patient/medical-history/${userId}`
        );

        if (!historyRes.ok) {
          if (historyRes.status === 404) setMedicalHistory(null);
          throw new Error(`Error: ${historyRes.statusText}`);
        }
        const historyJson = await historyRes.json();
        setMedicalHistory(historyJson);
      } catch (err) {
        setError("❌ Failed to load profile or medical history.");
        setMedicalHistory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const renderList = (items, emptyMsg, Icon, color) => (
    <ul className="space-y-2 text-gray-700">
      {items && items.length ? (
        items.map((item, i) => (
          <li
            key={i}
            className={`flex items-center gap-2 before:content-['•'] before:text-${color}-500`}
          >
            {typeof item === "object" ? (
              <span>
                <strong>{item.name}</strong> — {item.dosage} — {item.frequency}
              </span>
            ) : (
              item
            )}
          </li>
        ))
      ) : (
        <li className="italic text-gray-400">{emptyMsg}</li>
      )}
    </ul>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50">
        <div className="text-center bg-white shadow-xl p-6 rounded-xl border border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { user, dateOfBirth } = patient || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg border border-indigo-100 p-6 transition-transform hover:scale-[1.02]">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-indigo-500 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-indigo-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <ul className="text-gray-700 space-y-4">
            <li className="flex items-center gap-3">
              <FaUserTag className="text-indigo-400" />
              <span><strong>Role:</strong> {user?.role}</span>
            </li>
            <li className="flex items-center gap-3">
              <FaBirthdayCake className="text-indigo-400" />
              <span><strong>DOB:</strong> {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : 'Not provided'}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="font-mono bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs">ID: {userId}</span>
            </li>
          </ul>
        </div>

        {/* Medical History Section */}
        <div className="lg:col-span-2 bg-white shadow-xl rounded-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaNotesMedical className="text-blue-600" /> Medical History
          </h2>

          {medicalHistory ? (
            <div className="grid md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-purple-600">
                  <FaAllergies /> Allergies
                </h3>
                {renderList(medicalHistory.allergies, "No allergies.", FaAllergies, "purple")}
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-green-600">
                  <FaDisease /> Chronic Diseases
                </h3>
                {renderList(medicalHistory.chronicDiseases, "No chronic diseases.", FaDisease, "green")}
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-red-600">
                  <FaPills /> Medications
                </h3>
                {renderList(medicalHistory.medications, "No medications.", FaPills, "red")}
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-teal-600">
                  <FaSyringe /> Vaccination History
                </h3>
                {renderList(
                  medicalHistory.vaccinationHistory?.map((v) => `${v.vaccine?.name} — ${new Date(v.date).toLocaleDateString()}`),
                  "No vaccination records.",
                  FaSyringe,
                  "teal"
                )}
              </section>
            </div>
          ) : (
            <animated.div
              style={fadeIn}
              className="text-center bg-blue-100 rounded-lg p-6 text-blue-700 font-medium"
            >
              🚫 No medical history available. Please upload your records.
            </animated.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
