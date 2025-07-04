import axios from "axios";
import { useEffect, useState } from "react";

const UpdateMedicalHistory = ({ id }) => {
    const [allergies, setAllergies] = useState("");
    const [chronicDiseases, setChronicDiseases] = useState("");
    const [medications, setMedications] = useState([
        { name: "", dosage: "", frequency: "" },
    ]);
    const [vaccines, setVaccines] = useState([]);
    const [vaccinationHistory, setVaccinationHistory] = useState([
        { vaccine: "", date: "" },
    ]);
    const [message, setMessage] = useState(null);

    console.log("UpdateMedicalHistory received id:", id);

    useEffect(() => {
        if (id) {
            fetchVaccines();
            fetchExistingHistory();
        }
    }, [id]);

    const fetchVaccines = async () => {
        try {
            const res = await axios.get(
                "http://localhost:10/api/landingPage/vaccines"
            );
            setVaccines(res.data);
        } catch (err) {
            console.error("Error fetching vaccines:", err);
        }
    };

    const fetchExistingHistory = async () => {
        try {
            const res = await axios.get(
                `http://localhost:10/api/medical-history/${id}`
            );
            const data = res.data;
            setAllergies(data.allergies?.join(", ") || "");
            setChronicDiseases(data.chronicDiseases?.join(", ") || "");
            setMedications(
                data.medications || [{ name: "", dosage: "", frequency: "" }]
            );
            setVaccinationHistory(
                data.vaccinationHistory?.map((v) => ({
                    vaccine: v.vaccine,
                    date: v.date?.split("T")[0],
                })) || [{ vaccine: "", date: "" }]
            );
        } catch {
            console.log("No existing history found.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:10/api/medical-history/update/${id}`,
                {
                    allergies: allergies.split(",").map((a) => a.trim()),
                    chronicDiseases: chronicDiseases
                        .split(",")
                        .map((d) => d.trim()),
                    medications,
                    vaccinationHistory,
                }
            );
            setMessage("✅ Medical history updated successfully.");
        } catch (err) {
            console.error("Update failed:", err);
            setMessage("❌ Failed to update medical history.");
        }
    };

    const updateMed = (index, field, value) => {
        const updated = [...medications];
        updated[index][field] = value;
        setMedications(updated);
    };

    const updateVaccine = (index, field, value) => {
        const updated = [...vaccinationHistory];
        updated[index][field] = value;
        setVaccinationHistory(updated);
    };

    if (!id) {
        return (
            <div className="text-red-600 p-4">❌ No patient ID provided.</div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mt-10 mx-auto bg-white shadow rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">
                📝 Update Medical History
            </h2>

            {message && (
                <div className="mb-4 text-center text-sm text-green-600">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Allergies */}
                <div>
                    <label className="block font-medium mb-1">
                        Allergies (comma-separated)
                    </label>
                    <input
                        type="text"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Chronic Diseases */}
                <div>
                    <label className="block font-medium mb-1">
                        Chronic Diseases (comma-separated)
                    </label>
                    <input
                        type="text"
                        value={chronicDiseases}
                        onChange={(e) => setChronicDiseases(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Medications */}
                <div>
                    <label className="block font-medium mb-2">
                        Medications
                    </label>
                    {medications.map((med, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                value={med.name}
                                onChange={(e) =>
                                    updateMed(i, "name", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Dosage"
                                value={med.dosage}
                                onChange={(e) =>
                                    updateMed(i, "dosage", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Frequency"
                                value={med.frequency}
                                onChange={(e) =>
                                    updateMed(i, "frequency", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setMedications([
                                ...medications,
                                { name: "", dosage: "", frequency: "" },
                            ])
                        }
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ➕ Add Medication
                    </button>
                </div>

                {/* Vaccination History */}
                <div>
                    <label className="block font-medium mb-2">
                        Vaccination History
                    </label>
                    {vaccinationHistory.map((v, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"
                        >
                            <select
                                value={v.vaccine}
                                onChange={(e) =>
                                    updateVaccine(i, "vaccine", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            >
                                <option value="">-- Select Vaccine --</option>
                                {vaccines.map((vac) => (
                                    <option key={vac._id} value={vac._id}>
                                        {vac.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="date"
                                value={v.date}
                                onChange={(e) =>
                                    updateVaccine(i, "date", e.target.value)
                                }
                                className="border px-3 py-2 rounded"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setVaccinationHistory([
                                ...vaccinationHistory,
                                { vaccine: "", date: "" },
                            ])
                        }
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ➕ Add Vaccination
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateMedicalHistory;
