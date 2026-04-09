export const BACKEND_URL =
  `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/v1` || "http://localhost:3000/api/v1";

export const loginAPI = `${BACKEND_URL}/auth/login`
export const registerAPI = `${BACKEND_URL}/auth/register`
export const getCurrentUserAPI = `${BACKEND_URL}/auth/me`
