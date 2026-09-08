// MedAstra — DoctorPatientsPage
import React from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import DoctorPatients from '../../components/doctor/DoctorPatients.jsx';

const DoctorPatientsPage = () => {
  return (
    <AppLayout>
      <DoctorPatients />
    </AppLayout>
  );
};

export default DoctorPatientsPage;
