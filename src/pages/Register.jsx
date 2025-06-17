import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Register = () => {
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    qualifications: "",
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
      if (role === "doctor") {
        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("role", "doctor");
        form.append("specialization", formData.specialization);
        form.append("qualifications", formData.qualifications);
        if (formData.profilePhoto) {
          form.append("profilePhoto", formData.profilePhoto);
        }

        await axios.post("http://localhost:10/api/auth/doc/register", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Doctor registered successfully");
      } else {
        await axios.post("http://localhost:10/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "patient",
        });
        alert("Patient registered successfully");
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        specialization: "",
        qualifications: "",
        profilePhoto: null,
      });
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-blue-900 mb-6"
      >
        Create an Account
      </motion.h2>

      <motion.div
        className="flex space-x-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          className={`px-6 py-2 rounded-full shadow-md transition ${
            role === "patient"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
          onClick={() => setRole("patient")}
        >
          Patient
        </button>
        <button
          className={`px-6 py-2 rounded-full shadow-md transition ${
            role === "doctor"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
          onClick={() => setRole("doctor")}
        >
          Doctor
        </button>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg space-y-4 border border-blue-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-blue-200 p-3 rounded focus:outline-blue-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-blue-200 p-3 rounded focus:outline-blue-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-blue-200 p-3 rounded focus:outline-blue-400"
          required
        />

        {role === "doctor" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border border-blue-200 p-3 rounded"
              required
            />
            <input
              type="text"
              name="qualifications"
              placeholder="Qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              className="w-full border border-blue-200 p-3 rounded"
              required
            />
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded hover:bg-blue-700 transition"
        >
          Register as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </motion.form>
    </div>
  );
};

export default Register;
