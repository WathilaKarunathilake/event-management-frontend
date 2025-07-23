import { logoutUser } from "@/context/auth/AuthProvider";
import axios from "axios";
import { showErrorToast } from "./toast";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,  
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    const isSilentAuth = originalRequest?.url?.includes("/me");

    if (error.response?.status === 401) {
      if (!isSilentAuth) {
        logoutUser();
        window.location.href = '/login';
        showErrorToast('User session timeout');
      }
    } else if (error.response?.status === 403) {
      throw new Error("You don't have access to view this");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
