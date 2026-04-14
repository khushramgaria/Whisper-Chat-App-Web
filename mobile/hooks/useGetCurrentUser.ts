import React, { useState } from "react";
import { getCurrentUserAPI } from "@/lib/api";
import axios from "axios";
import { getToken } from "@/lib/token";

interface User {
  id: string;
  name: string;
  email: string;
}

export const useGetCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const token: string | null = await getToken();

      const res = await axios.get(getCurrentUserAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User details fetched successfully", res);

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      const errMsg =
        (error as Error)?.response?.data?.message ||
        "An error occurred while getting user details. Please try again.";

      console.log("Error getting user details: ", errMsg);
      console.log("Error getting user details: ", (error as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, getCurrentUser };
};
