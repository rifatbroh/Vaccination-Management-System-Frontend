import axios from "axios";
import { useState } from "react";

const RegisterModal = ({ onClose }) => {
    const [role, setRole] = useState("patient");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
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
                Object.entries(formData).forEach(([key, val]) => {
                    if (val) form.append(key, val);
                });
                form.append("role", "doctor");

                await axios.post(
                    "http://localhost:10/api/auth/doc/register",
                    form,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                alert("Doctor registered successfully");
            } else {
                await axios.post("http://localhost:10/api/auth/register", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: "patient",
                    dateOfBirth: formData.dateOfBirth,
                });
                alert("Patient registered successfully");
            }
            onClose();
        } catch (err) {
            alert(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2374b1]/30 backdrop-blur-sm overflow-y-auto">
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Create an account
                        </h3>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            ✕<span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-4 md:p-5">
                        <div className="flex justify-center gap-3 mb-4">
                            <button
                                onClick={() => setRole("patient")}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    role === "patient"
                                        ? "bg-blue-600 text-white"
                                        : "bg-white border border-blue-600 text-blue-600"
                                }`}
                            >
                                Patient
                            </button>
                            <button
                                onClick={() => setRole("doctor")}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    role === "doctor"
                                        ? "bg-blue-600 text-white"
                                        : "bg-white border border-blue-600 text-blue-600"
                                }`}
                            >
                                Doctor
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid gap-4 grid-cols-1"
                        >
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                    className="input-field"
                                />
                            </div>

                            {role === "patient" && (
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="name@example.com"
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="input-field"
                                />
                            </div>

                            {role === "doctor" && (
                                <>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            Specialization
                                        </label>
                                        <input
                                            type="text"
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleChange}
                                            required
                                            placeholder="Cardiology"
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            Qualifications
                                        </label>
                                        <input
                                            type="text"
                                            name="qualifications"
                                            value={formData.qualifications}
                                            onChange={handleChange}
                                            placeholder="MBBS, MD"
                                            className="input-field"
                                        />
                                    </div>
                                    {/* <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleChange}
                      className="input-field file:bg-white file:border file:border-gray-300"
                    />
                  </div> */}
                                </>
                            )}

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-5 py-2.5 font-medium"
                            >
                                Register as{" "}
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
