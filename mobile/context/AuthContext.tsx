import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "@/lib/token";
import axios from "axios";
import { loginAPI } from "@/lib/api";
import { AuthContextType, User } from "@/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ← blocks render until checked

  useEffect(() => {
    const hydrate = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          setToken(storedToken);
          // optionally fetch user here too (see Step 6)
        }
      } catch (e) {
        console.log("Auth hydration error:", e);
      } finally {
        setIsLoading(false); // ← unblocks the app
      }
    };
    hydrate();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post(loginAPI, { email, password });
    if (res.data?.success) {
      const { accessToken, user } = res.data.data;
      await saveToken(accessToken);
      setToken(accessToken);
      setUser(user); // ✅ store user from login response directly
    }
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isSignedIn: !!token,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ✅ Custom hook — use this everywhere
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
