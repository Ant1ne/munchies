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

export const fetchOpenRestaurants = async (restaurantId: string) => {
  try {
    if (!restaurantId) {
      return [];
    }
    const url = `/api/open/?restaurant_id=${restaurantId}`;
    const response = await api.get(url);
    console.log("Fetched open restaurants:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching open restaurants:", error);
    throw error;
  }
};
