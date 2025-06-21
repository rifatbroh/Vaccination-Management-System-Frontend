import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [vaccinations, setVaccinations] = useState(0);

  const targetPatients = 20;
  const targetDoctors = 4;
  const targetVaccinations = 7;

  useEffect(() => {
    const animateValue = (setValue, target) => {
      let current = 0;
      const duration = 1000;
      const stepTime = Math.max(Math.floor(duration / target), 50);

      const timer = setInterval(() => {
        current += 1;
        setValue(current);
        if (current >= target) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    animateValue(setPatients, targetPatients);
    animateValue(setDoctors, targetDoctors);
    animateValue(setVaccinations, targetVaccinations);
  }, []);

  return (
    <div>
      <div className="card flex justify-center gap-20 bg-[#002570] mt-20 mx-60 rounded-xl shadow-lg">
        <div className="card-1 h-40 w-60 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-[#e1eeff]">{patients}+</h1>
          <p className="text-3xl text-white">Patients</p>
        </div>
        <div className="card-1 h-40 w-60 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-[#e1eeff]">
            {doctors.toString().padStart(2, '0')}+
          </h1>
          <p className="text-3xl text-white mr-5">Doctors</p>
        </div>
        <div className="card-1 h-40 w-60 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-[#e1eeff]">
            {vaccinations.toString().padStart(2, '0')}+
          </h1>
          <p className="text-3xl text-white">Vaccination</p>
        </div>
      </div>
    </div>
  );
};

// Want to load from real-time API/database later?
// Just replace targetPatients, targetDoctors, etc., with values fetched from your backend using axios or fetch, like:

// js
// Copy
// Edit
// useEffect(() => {
//   fetch('/api/dashboard-data')
//     .then(res => res.json())
//     .then(data => {
//       animateValue(setPatients, data.patients);
//       animateValue(setDoctors, data.doctors);
//       animateValue(setVaccinations, data.vaccinations);
//     });
// }, []);

export default Counter;
