// MedAstra — Auth Context
import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService.js';
import { TOKEN_KEY, USER_KEY } from '../utils/constants.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On mount: verify stored token by calling /auth/me
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (!token || !storedUser) {
        setLoading(false);
        return;
      }

      try {
        const res = await authService.getMe();
        const freshUser = res.data?.user || res.data;
        // Merge with stored token if backend returns user without token
        const userWithToken = { ...freshUser, token };
        setUser(userWithToken);
        localStorage.setItem(USER_KEY, JSON.stringify(userWithToken));
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

  /**
   * Login: calls API, persists token + user, returns user object for redirect
   */
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await authService.login({ email, password });
      const { token, user: userData } = res.data;
      const userWithToken = { ...userData, token };
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userWithToken));
      setUser(userWithToken);
      return userWithToken;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Please check your credentials.';
      setError(msg);
      throw new Error(msg);
    }
  };

  /**
   * Register: calls API, persists token + user, returns user for redirect
   */
  const register = async (name, email, password, role) => {
    setError(null);
    try {
      const res = await authService.register({ name, email, password, role });
      const { token, user: userData } = res.data;
      const userWithToken = { ...userData, token };
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userWithToken));
      setUser(userWithToken);
      return userWithToken;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please try again.';
      setError(msg);
      throw new Error(msg);
    }
  };

  /**
   * Logout: clear localStorage and reset state
   */
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
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to consume AuthContext
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
