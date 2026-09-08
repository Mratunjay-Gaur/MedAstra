// MedAstra — Auth Service
import api from './api.js';

/**
 * Register a new user
 * @param {{ name: string, email: string, password: string, role: string }} data
 */
export const register = (data) => api.post('/auth/register', data);

/**
 * Login a user
 * @param {{ email: string, password: string }} data
 */
export const login = (data) => api.post('/auth/login', data);

/**
 * Get the currently authenticated user
 */
export const getMe = () => api.get('/auth/me');
