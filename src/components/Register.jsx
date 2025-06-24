import React, { useState } from 'react';
import axios from 'axios';

const RegisterModal = ({ onClose }) => {
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    qualifications: '',
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === 'doctor') {
        const form = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          if (val) form.append(key, val);
        });
        form.append('role', 'doctor');

        await axios.post('http://localhost:10/api/auth/doc/register', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Doctor registered successfully');
      } else {
        await axios.post('http://localhost:10/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'patient',
        });
        alert('Patient registered successfully');
      }
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2374b1]/30 backdrop-blur-sm overflow-y-auto" aria-modal="true" role="dialog">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create an account
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">
            <div className="flex justify-center gap-3 mb-4">
              <button
                onClick={() => setRole('patient')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  role === 'patient' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600 text-blue-600'
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => setRole('doctor')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  role === 'doctor' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600 text-blue-600'
                }`}
              >
                Doctor
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              {role === 'doctor' && (
                <>
                  {/* <div>
                    <label htmlFor="specialization" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      id="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Cardiology"
                    />
                  </div>
                  <div>
                    <label htmlFor="qualifications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Qualifications
                    </label>
                    <input
                      type="text"
                      name="qualifications"
                      id="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="MBBS, MD"
                    />
                  </div>
                  <div>
                    <label htmlFor="profilePhoto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      name="profilePhoto"
                      id="profilePhoto"
                      accept="image/*"
                      onChange={handleChange}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
                    />
                  </div> */}
                </>
              )}

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register as {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
