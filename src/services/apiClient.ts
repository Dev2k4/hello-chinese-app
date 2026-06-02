import axios from "axios";
import { API_BASE_URL } from "../constants/apiRoutes";
import { getToken, getOnUnauthorized } from "./tokenHolder";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const clearAuth = getOnUnauthorized();
      clearAuth?.();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
