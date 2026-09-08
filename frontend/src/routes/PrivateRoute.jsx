// MedAstra — PrivateRoute Component
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from '../components/common/Loader.jsx';
import { ROLES } from '../utils/constants.js';

const getRoleDashboard = (role) => {
  switch (role) {
    case ROLES.PATIENT:
      return '/patient/dashboard';
    case ROLES.DOCTOR:
      return '/doctor/dashboard';
    case ROLES.ADMIN:
      return '/admin/dashboard';
    default:
      return '/login';
  }
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader message="Verifying authentication..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // Redirect user to their own role-specific dashboard
      const redirectPath = getRoleDashboard(user.role);
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

export default PrivateRoute;
