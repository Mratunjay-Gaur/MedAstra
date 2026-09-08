// MedAstra — Auth Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService.js';
import { TOKEN_KEY, USER_KEY } from '../utils/constants.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On mount: restore authentication from localStorage and verify via /auth/me
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // ignore parsing error
        }
      }

      try {
        const res = await authService.getMe();
        const userData = res.data?.user || res.data;
        const normalizedUser = {
          id: userData.id || userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          organizationId: userData.organizationId || null,
          token
        };
        setUser(normalizedUser);
        localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
      } catch (err) {
        // Token invalid or expired — clear storage
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await authService.login({ email, password });
      const data = res.data;
      const token = data.token;
      const u = data.user || data;
      const userObj = {
        id: data.id || u.id || u._id,
        name: data.name || u.name,
        email: data.email || u.email,
        role: data.role || u.role,
        organizationId: data.organizationId || u.organizationId || null,
        token
      };
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userObj));
      setUser(userObj);
      return userObj;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Please check your credentials.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const register = async (name, email, password, role) => {
    setError(null);
    try {
      const res = await authService.register({ name, email, password, role });
      const data = res.data;
      const token = data.token;
      const u = data.user || data;
      const userObj = {
        id: data.id || u.id || u._id,
        name: data.name || u.name,
        email: data.email || u.email,
        role: data.role || u.role,
        organizationId: data.organizationId || u.organizationId || null,
        token
      };
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userObj));
      setUser(userObj);
      return userObj;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please try again.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    setError,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export default AuthContext;
