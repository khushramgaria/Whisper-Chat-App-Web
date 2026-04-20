import axios from "axios";
import { BACKEND_URL } from "./api";
import { getToken, removeToken } from "./token";
import { useCallback } from "react";
import { router } from "expo-router";

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor registered once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await removeToken();
      router.replace("/(auth)"); // ✅ force back to login
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
