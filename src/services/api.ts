import axios from "axios";
import axiosRetry from "axios-retry";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRetry(api, { retries: 3 });

api.interceptors.request.use(
  (config) => {
    console.log("Request config:", config);
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response error data:", error.response.data);
      console.error("Response error status:", error.response.status);
      console.error("Response error headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export const fetchRestaurants = () => api.get("/restaurants");

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const fetchRestaurants = async () => {
//   const response = await fetch(`${BASE_URL}/restaurants`);
//   console.log("Fetched response:", response);

//   if (!response.ok) {
//     throw new Error(`Network response was not ok: ${response.status}`);
//   }

//   const data = await response.json();
//   console.log("Parsed response data:", data);
//   return data;
// };

// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api",
// });

// // Optional: Add error handling for Axios instance creation
// api.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );

// export default api;