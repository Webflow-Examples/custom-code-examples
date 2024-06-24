import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:${process.env.PORT}/api/`, // Set your base URL here
  headers: {
    "Content-Type": "application/json",
  },
  // You can add other default settings here
});

export default axiosInstance;
