// MedAstra — Signup Component
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
  { value: ROLES.ADMIN, label: 'Administrator' },
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES.PATIENT,
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { register } = useAuth();
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
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      errors.role = 'Please select a role';
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
      const user = await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
        formData.role
      );

      const userRole = user.role || formData.role;
      if (userRole === ROLES.DOCTOR) {
        navigate('/doctor/dashboard');
      } else if (userRole === ROLES.ADMIN) {
        navigate('/admin/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '2.5rem auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏥</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
          MedAstra
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          AI-Assisted Patient Case Taking
        </p>
      </div>

      <Card title="Create an Account" subtitle="Join the modern healthcare network">
        {apiError && (
          <div style={{ marginBottom: '1.25rem' }}>
            <Alert type="error" message={apiError} onClose={() => setApiError(null)} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            placeholder="Dr. Sarah Johnson or John Doe"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="sarah@hospital.org"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
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

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            style={{ marginTop: '0.75rem' }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
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
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
