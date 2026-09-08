// MedAstra — LoginPage
import React from 'react';
import Login from '../../components/auth/Login.jsx';

const LoginPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Login />
    </div>
  );
};

export default LoginPage;
