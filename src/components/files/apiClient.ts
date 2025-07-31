import { logoutUser } from "@/context/auth/AuthProvider";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          null,
          { withCredentials: true },
        );
        return apiClient(originalRequest);
      } catch (refreshError) {
        logoutUser("User session timeout");
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      throw new Error("You don't have access to view this");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
