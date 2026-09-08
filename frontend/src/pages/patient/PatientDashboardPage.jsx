// MedAstra — PatientDashboardPage
import React from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import PatientDashboard from '../../components/patient/PatientDashboard.jsx';

const PatientDashboardPage = () => {
  return (
    <AppLayout>
      <PatientDashboard />
    </AppLayout>
  );
};

export default PatientDashboardPage;
