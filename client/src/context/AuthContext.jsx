import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api, { setAccessToken } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booting, setBooting] = useState(true); // true while we wake a sleeping Render instance

  // On first load, try to silently restore a session via the refresh cookie.
  // Render free tier cold starts can take 20-40s, so we give this a generous
  // timeout and surface a "waking up" state instead of a hard failure.
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const res = await api.post("/auth/refresh");
        if (cancelled) return;
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch (err) {
        // no valid session - that's fine, user just isn't logged in
      } finally {
        if (!cancelled) {
          setLoading(false);
          setBooting(false);
        }
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await api.post("/auth/register", payload);
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const res = await api.get("/auth/me");
    setUser(res.data.user);
    return res.data.user;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, booting, login, register, logout, refreshUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
