// MedAstra — AppRoutes Component
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import LandingPage from '../pages/landing/LandingPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import SignupPage from '../pages/auth/SignupPage.jsx';

// Patient Pages
import PatientDashboardPage from '../pages/patient/PatientDashboardPage.jsx';
import PatientProfilePage from '../pages/patient/PatientProfilePage.jsx';

// Doctor Pages
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage.jsx';
import DoctorPatientsPage from '../pages/doctor/DoctorPatientsPage.jsx';

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx';
import OrganizationPage from '../pages/admin/OrganizationPage.jsx';

import { ROLES } from '../utils/constants.js';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Patient Protected Routes */}
      <Route
        path="/patient/dashboard"
        element={
          <PrivateRoute allowedRoles={[ROLES.PATIENT]}>
            <PatientDashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/profile"
        element={
          <PrivateRoute allowedRoles={[ROLES.PATIENT]}>
            <PatientProfilePage />
          </PrivateRoute>
        }
      />

      {/* Doctor Protected Routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <PrivateRoute allowedRoles={[ROLES.DOCTOR]}>
            <DoctorDashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctor/patients"
        element={
          <PrivateRoute allowedRoles={[ROLES.DOCTOR]}>
            <DoctorPatientsPage />
          </PrivateRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/organization"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
            <OrganizationPage />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
