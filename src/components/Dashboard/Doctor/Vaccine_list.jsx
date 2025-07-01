import axios from "axios";
import { useEffect, useState } from "react";

const Vaccine_list = () => {
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      const res = await axios.get("http://localhost:10/api/landingPage/vaccines");
      setVaccines(res.data);
    } catch (err) {
      console.error("Error fetching vaccines:", err);
    }
  };

  const viewVaccine = async (id) => {
    try {
      const res = await axios.get(`http://localhost:10/api/admin/get-a-vaccine/${id}`);
      setSelectedVaccine(res.data);
    } catch (err) {
      console.error("View failed:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 ">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">💉 Available Vaccine</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaccines.map((vaccine) => (
          <div
            key={vaccine._id}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition flex flex-col"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{vaccine.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Manufacturer:</strong> {vaccine.manufacturer}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Doses:</strong> {vaccine.dosesRequired}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Gap:</strong> {vaccine.gapBetweenDoses} days
              </p>
            </div>

            <div className="mt-auto flex justify-end pt-4">
              <button
                onClick={() => viewVaccine(vaccine._id)}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                About
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Vaccine Modal */}
      {selectedVaccine && (
        <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
            <button
              onClick={() => setSelectedVaccine(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">Vaccine Details</h2>

            <div className="space-y-2 text-gray-800">
              <p><strong className="text-gray-600">Name:</strong> {selectedVaccine.name}</p>
              <p><strong className="text-gray-600">Manufacturer:</strong> {selectedVaccine.manufacturer}</p>
              <p><strong className="text-gray-600">Description:</strong></p>
              <p className="bg-gray-100 rounded p-2 text-sm">{selectedVaccine.description}</p>
              <p><strong className="text-gray-600">Doses Required:</strong> {selectedVaccine.dosesRequired}</p>
              <p><strong className="text-gray-600">Gap Between Doses:</strong> {selectedVaccine.gapBetweenDoses} days</p>
              <p><strong className="text-gray-600">Created At:</strong> {new Date(selectedVaccine.createdAt).toLocaleString()}</p>
            </div>

            <div className="text-right mt-6">
              <button
                onClick={() => setSelectedVaccine(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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

export default Vaccine_list;
