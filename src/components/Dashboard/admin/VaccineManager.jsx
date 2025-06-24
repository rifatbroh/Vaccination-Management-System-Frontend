import axios from "axios";
import { useEffect, useState } from "react";

const VaccineManager = () => {
  const [vaccines, setVaccines] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    description: "",
    dosesRequired: 1,
    gapBetweenDoses: 0,
  });

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

  const deleteVaccine = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vaccine?")) return;
    try {
      await axios.delete(`http://localhost:10/api/admin/delete-vaccine/${id}`);
      fetchVaccines();
    } catch (err) {
      console.error("Delete failed:", err);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitVaccine = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:10/api/admin/add-vaccine", formData);
      setShowAddModal(false);
      setFormData({
        name: "",
        manufacturer: "",
        description: "",
        dosesRequired: 1,
        gapBetweenDoses: 0,
      });
      fetchVaccines();
    } catch (err) {
      console.error("Add vaccine failed:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">💉 Vaccine Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {vaccines.map((vaccine) => (
    <div
      key={vaccine._id}
      className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition flex flex-col"
    >
      {/* Content section */}
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

      {/* Bottom-right buttons section */}
      <div className="mt-auto flex justify-end gap-2 pt-4">
        <button
          onClick={() => viewVaccine(vaccine._id)}
          className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          About
        </button>
        <button
          onClick={() => deleteVaccine(vaccine._id)}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  ))}
</div>


      {/* Add Vaccine Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-lg text-lg"
        >
          ➕ Add Vaccine
        </button>
      </div>

      {/* Add Vaccine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Vaccine</h2>
            <form onSubmit={submitVaccine} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Vaccine Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Doses Required</label>
                  <input
                    type="number"
                    name="dosesRequired"
                    value={formData.dosesRequired}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gap Between Doses (days)</label>
                  <input
                    type="number"
                    name="gapBetweenDoses"
                    value={formData.gapBetweenDoses}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="text-right mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Vaccine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Vaccine Modal */}
      {selectedVaccine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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

export default VaccineManager;
