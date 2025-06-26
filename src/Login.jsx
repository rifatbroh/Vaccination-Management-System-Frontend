import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Adjusted API URL to include full path
      const res = await axios.post("http://localhost:10/api/auth/login", formData);

      const { token, role } = res.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Navigate based on role
      if (role === "doctor") {
        navigate("/dashboard/doctor");
      } else if (role === "patient") {
        navigate("/dashboard/patient");
      } else {
        setError("Invalid role returned from server.");
      }
    } catch (err) {
      // Handle errors from backend
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <h2 className="text-4xl font-extrabold mb-6 text-blue-800 animate-fade-in">
        Login 🔐
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-5 transition-all animate-fade-in"
      >
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-600 hover:text-blue-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm font-semibold bg-red-100 p-2 rounded">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;