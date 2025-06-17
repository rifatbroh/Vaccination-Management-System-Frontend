// src/components/AuthForm.jsx
import React from "react";

const AuthForm = ({ formData, setFormData, handleSubmit, isDoctor, isRegister }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isDoctor ? "Doctor" : "Patient"} {isRegister ? "Registration" : "Login"}
      </h2>

      {isRegister && (
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="input"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="input"
        required
      />

      {isDoctor && isRegister && (
        <>
          <input
            type="text"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
            className="input"
            required
          />

          <input
            type="text"
            placeholder="Qualifications"
            value={formData.qualifications}
            onChange={(e) =>
              setFormData({ ...formData, qualifications: e.target.value })
            }
            className="input"
            required
          />

          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, profilePhoto: e.target.files[0] })
            }
            className="input"
          />
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
