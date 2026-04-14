import axios from "axios";
import { BACKEND_URL } from "./api";
import { getToken } from "./token";
import { useCallback } from "react";

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor registered once
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(
        `API request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      );
    } else if (error.request) {
      console.log("API request failed - no response", {
        endpoint: error.config?.url,
        method: error.config?.method,
      });
    }
    return Promise.reject(error);
  },
);

export const useAPI = () => {
  const apiWithAuth = useCallback(
    async <T>(config: Parameters<typeof api.request>[0]) => {
      const token = await getToken();
      return api.request<T>({
        ...config,
        headers: {
          ...config.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    },
    [getToken],
  );

  return { api, apiWithAuth };
};
