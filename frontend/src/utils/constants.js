// MedAstra — Application Constants

export const API_BASE_URL = 'http://localhost:5000/api';
export const TOKEN_KEY = 'medastra_token';
export const USER_KEY = 'medastra_user';

export const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PATIENT_DASHBOARD: '/patient/dashboard',
  PATIENT_PROFILE: '/patient/profile',
  DOCTOR_DASHBOARD: '/doctor/dashboard',
  DOCTOR_PATIENTS: '/doctor/patients',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ORGANIZATION: '/admin/organization',
  NOT_FOUND: '*',
};
