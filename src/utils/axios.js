import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:0010/api", // Ensure the port is correct
});

// Add request interceptor to attach JWT token from localStorage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Adjust the key if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
