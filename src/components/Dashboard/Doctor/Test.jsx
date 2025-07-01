import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Test = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error handling

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await fetch(`http://localhost:10/api/doctor/Profile/${id}`);
        const data = await res.json();
        if (res.ok) {
          setDoctor(data);
        } else {
          setError("Doctor not found");
        }
      } catch (err) {
        setError("Loading to fetch doctor data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

  if (loading) return <div className="p-5 text-xl">Loading doctor info...</div>;
  if (error) return <div className="p-5 text-red-500 text-xl">{error}</div>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">
        Hello, my name is Dr. {doctor?.user?.name || "Unknown"}
      </h1>
      <p className="mt-2 text-lg text-gray-700">
        Specialization: {doctor.specialization || "N/A"}
      </p>
      {/* Add more doctor data if needed */}
    </div>
  );
};

export default Test;
