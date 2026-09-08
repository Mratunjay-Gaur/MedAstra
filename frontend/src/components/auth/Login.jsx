// MedAstra — Login Component
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Card from '../ui/Card.jsx';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import Select from '../ui/Select.jsx';
import Alert from '../ui/Alert.jsx';
import { isValidEmail } from '../../utils/validators.js';
import { ROLES } from '../../utils/constants.js';

const roleOptions = [
  { value: ROLES.PATIENT, label: 'Patient' },
  { value: ROLES.DOCTOR, label: 'Doctor' },
  { value: ROLES.ADMIN, label: 'Admin' },
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ROLES.PATIENT,
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email address is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (!formData.role) {
      errors.role = 'Please select your role';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);

      // Verify role matches selected role if desired, or redirect based on actual user role
      const userRole = user.role || formData.role;
      if (formData.role && user.role && formData.role !== user.role) {
        setApiError(`Logged-in account is registered as '${user.role}', but you selected '${formData.role}'. Redirecting to ${user.role} dashboard...`);
      }

      if (userRole === ROLES.DOCTOR) {
        navigate('/doctor/dashboard');
      } else if (userRole === ROLES.ADMIN) {
        navigate('/admin/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setApiError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏥</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
          MedAstra
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          AI-Assisted Patient Case Taking
        </p>
      </div>

      <Card title="Sign In to Your Account" subtitle="Access your healthcare portal">
        {apiError && (
          <div style={{ marginBottom: '1.25rem' }}>
            <Alert type="error" message={apiError} onClose={() => setApiError(null)} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="doctor@hospital.org or patient@example.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required
          />

          <Select
            label="Account Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
            error={formErrors.role}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            style={{ marginTop: '0.75rem' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
          }}
        >
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
