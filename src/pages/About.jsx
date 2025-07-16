import { useEffect, useState } from "react";

const About = () => {
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      const res = await fetch("https://api.example.com/api/landingPage/vaccines");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setVaccines(data);
    } catch (err) {
      console.error("Error fetching vaccines:", err);
      setVaccines([
        {
          _id: "1",
          name: "VaxShield",
          manufacturer: "Global Pharma",
          dosesRequired: 2,
          gapBetweenDoses: 21,
          description: "A highly effective vaccine providing broad protection against common viral strains...",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          name: "ImmunoGuard",
          manufacturer: "BioTech Solutions",
          dosesRequired: 1,
          gapBetweenDoses: 0,
          description: "Single-dose vaccine offering rapid immunity...",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "3",
          name: "HealthBoost",
          manufacturer: "MediCorp Inc.",
          dosesRequired: 3,
          gapBetweenDoses: 28,
          description: "Advanced multi-dose vaccine designed for long-term immunity...",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "4",
          name: "CareVax",
          manufacturer: "PharmaGen",
          dosesRequired: 2,
          gapBetweenDoses: 14,
          description: "A new generation vaccine with minimal side effects...",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const viewVaccine = async (id) => {
    try {
      const res = await fetch(`https://api.example.com/api/admin/get-a-vaccine/${id}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setSelectedVaccine(data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("View failed:", err);
      const vaccine = vaccines.find(v => v._id === id);
      if (vaccine) {
        setSelectedVaccine(vaccine);
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setSelectedVaccine(null);
    setIsModalOpen(false);
  };

  return (
    <div className="py-16 px-6 bg-[#e1eeff] from-blue-50 to-white font-inter">
      <div className="top-info flex flex-col md:flex-row pt-10 pb-22 px-6 gap-10 justify-center text-center md:text-left">
        <div className="left-text">
          <p className="text-5xl font-bold text-[#002570]">Extra Ordinary <br /> <span className="text-[#1c76cb]">Vaccine Solutions</span></p>
        </div>
        <div className="right-text max-w-xl">
          <p className="text-2xl">Protecting you with modern vaccines. Explore our featured options crafted by leading manufacturers.</p>
        </div>
      </div>

      {/* Gradient Card Grid */}
      <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-3 justify-center max-w-6xl mx-auto">
        {vaccines.slice(0, 3).map((vaccine) => (
          <div
            key={vaccine._id}
            className="group p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => viewVaccine(vaccine._id)}
          >
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 ease-in-out hover:-translate-y-3 hover:scale-[1.03]">
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src="https://www.svgrepo.com/show/485748/injection.svg"
                  alt="Vaccine Icon"
                  className="h-28 w-28 mb-6 transition-transform duration-500 group-hover:scale-110"
                />
                <h2 className="text-3xl font-bold text-[#002570] mb-3 leading-tight">{vaccine.name}</h2>
                <p className="text-gray-700 text-base mb-1">
                  <strong className="font-semibold">Manufacturer:</strong> {vaccine.manufacturer}
                </p>
                <p className="text-gray-700 text-base mb-1">
                  <strong className="font-semibold">Doses:</strong> {vaccine.dosesRequired}
                </p>
                <p className="text-gray-700 text-base mb-4">
                  <strong className="font-semibold">Gap:</strong> {vaccine.gapBetweenDoses} days
                </p>
                <span className="text-blue-600 font-semibold text-lg mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedVaccine && (
        <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto  bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl transform scale-95 animate-scale-in">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-4xl font-light leading-none transition-colors duration-200"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-4xl font-extrabold text-[#1c76cb] mb-6 border-b pb-3 border-blue-100">
              Vaccine Details
            </h2>

            <div className="space-y-4 text-gray-800 text-lg">
              <p>
                <strong className="text-gray-600">Name:</strong> {selectedVaccine.name}
              </p>
              <p>
                <strong className="text-gray-600">Manufacturer:</strong> {selectedVaccine.manufacturer}
              </p>
              <div>
                <strong className="text-gray-600 block mb-2">Description:</strong>
                <p className="bg-blue-50 rounded-xl p-4 text-base leading-relaxed text-gray-700 border border-blue-100">
                  {selectedVaccine.description}
                </p>
              </div>
              <p>
                <strong className="text-gray-600">Doses Required:</strong> {selectedVaccine.dosesRequired}
              </p>
              <p>
                <strong className="text-gray-600">Gap Between Doses:</strong> {selectedVaccine.gapBetweenDoses} days
              </p>
              <p className="text-sm text-gray-500 pt-2">
                <strong className="text-gray-600">Created At:</strong> {new Date(selectedVaccine.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right mt-8">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg
                           hover:bg-blue-700 transition-all duration-300 transform hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;