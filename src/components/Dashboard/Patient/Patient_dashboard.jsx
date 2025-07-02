import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserInjured, FaNotesMedical } from "react-icons/fa";
import Admin_Sidebar from "../Single_components/Admin_sidebar";
import axios from "axios";

const Patient_dashboard = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Replace with your actual backend endpoint
    axios.get(`http://localhost:5100/api/patients/${id}`)
      .then(response => {
        setPatient(response.data);
      })
      .catch(error => {
        console.error("Error fetching patient:", error);
      });
  }, [id]);

  return (
    <div className="doctor_dashboard flex">
      {/* Sidebar */}
      <div className="left-doctor w-[20%]">
        <Admin_Sidebar role="patient" />
      </div>

      {/* Main content */}
      <div className="right-doctor w-[80%] pr-20">
        <div className="p-8 bg-[#fdfdfd] min-h-screen">
          <h1 className="text-3xl font-bold mb-4">
            Welcome, {patient ? patient.name : "Loading..."} 👨‍⚕️
          </h1>
          <p className="mb-2 text-2xl">Manage your appointments and health records efficiently.</p>

          {/* Dashboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow text-lg font-medium flex items-center gap-4">
              <FaUserInjured className="text-blue-500 text-2xl" />
              View Profile
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-lg font-medium flex items-center gap-4">
              <FaNotesMedical className="text-green-500 text-2xl" />
              Manage Appointments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient_dashboard;
