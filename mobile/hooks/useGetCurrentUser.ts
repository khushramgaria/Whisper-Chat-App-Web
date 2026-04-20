import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAPI } from "@/lib/axios";
import { getCurrentUserAPI } from "@/lib/api";

export const useGetCurrentUser = () => {
  const { user, setUser } = useAuth();
  const { apiWithAuth } = useAPI();
  const [loading, setLoading] = useState(false);

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiWithAuth<{ success: boolean; data: typeof user }>({
        method: "GET",
        url: getCurrentUserAPI,
      });
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message || "Failed to fetch user details.";
      console.log("Error getting user:", errMsg);
    } finally {
      setLoading(false);
    }
  }, [apiWithAuth, setUser]);

  return { user, loading, getCurrentUser };
};
