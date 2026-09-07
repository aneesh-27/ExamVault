import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/api";

const TOKEN_KEY = "examvault_access_token";

const AuthContext = createContext(null);

function navigateTo(path) {
  if (window.location.pathname === path) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function storeToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Keep auth usable when browser storage is unavailable.
  }
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(getStoredToken);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function initAuth() {
      if (!accessToken) {
        if (active) setIsInitializing(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser(accessToken);
        if (active) setUser(currentUser);
      } catch {
        storeToken(null);
        if (active) {
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (active) setIsInitializing(false);
      }
    }

    initAuth();
    return () => { active = false; };
  }, [accessToken]);

  const login = async (email, password) => {
    setError("");
    const tokenResponse = await loginUser({ email, password });
    storeToken(tokenResponse.access_token);
    setAccessToken(tokenResponse.access_token);
    const currentUser = await getCurrentUser(tokenResponse.access_token);
    setUser(currentUser);
    navigateTo("/dashboard");
    return currentUser;
  };

  const register = async (email, fullName, password) => {
    setError("");
    await registerUser({ email, full_name: fullName, password });
    await login(email, password);
  };

  const logout = () => {
    storeToken(null);
    setAccessToken(null);
    setUser(null);
    setError("");
    navigateTo("/auth/login");
  };

  const value = useMemo(() => ({
    accessToken,
    user,
    isInitializing,
    error,
    setError,
    login,
    register,
    logout,
  }), [accessToken, user, isInitializing, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
