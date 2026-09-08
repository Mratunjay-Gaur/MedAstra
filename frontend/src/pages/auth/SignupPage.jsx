// MedAstra — SignupPage
import React from 'react';
import Signup from '../../components/auth/Signup.jsx';

const SignupPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Signup />
    </div>
  );
};

export default SignupPage;
