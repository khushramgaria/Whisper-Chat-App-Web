export const BACKEND_URL =
  `${import.meta.env.VITE_BACKEND_URL}/api/v1` || "http://localhost:3000/api/v1";

export const loginAPI = `${BACKEND_URL}/auth/login`
export const registerAPI = `${BACKEND_URL}/auth/register`
