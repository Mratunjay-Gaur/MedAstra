// MedAstra — PatientProfile Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Card from '../ui/Card.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import Alert from '../ui/Alert.jsx';
import Loader from '../common/Loader.jsx';
import api from '../../services/api.js';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Other', label: 'Other' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const PatientProfile = () => {
  const { user } = useAuth();
  const [profileId, setProfileId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    emergencyContact: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/auth/me');
        if (isMounted) {
          const u = res.data?.user || res.data;
          const prof = u?.profile || null;
          if (prof?._id) {
            setProfileId(prof._id);
          }
          let dobFormatted = '';
          if (prof?.dateOfBirth) {
            dobFormatted = new Date(prof.dateOfBirth).toISOString().split('T')[0];
          }
          setFormData({
            name: u?.name || user?.name || '',
            dateOfBirth: dobFormatted,
            gender: prof?.gender || '',
            phone: prof?.phone || '',
            address: prof?.address || '',
            emergencyContact: prof?.emergencyContact || '',
          });
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch patient records from server.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const payload = {
        dateOfBirth: formData.dateOfBirth || null,
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
      };

      if (profileId) {
        await api.put(`/patients/${profileId}`, payload);
      } else {
        const res = await api.post('/patients', payload);
        const newPatient = res.data?.patient;
        if (newPatient?._id) {
          setProfileId(newPatient._id);
        }
      }
      setMessage('Patient profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader message="Loading profile information..." />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>
          Patient Profile
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Review and update your clinical record demographics and emergency details.
        </p>
      </div>

      {message && (
        <div style={{ marginBottom: '1.25rem' }}>
          <Alert type="success" message={message} onClose={() => setMessage(null)} />
        </div>
      )}

      {error && (
        <div style={{ marginBottom: '1.25rem' }}>
          <Alert type="error" message={error} onClose={() => setError(null)} />
        </div>
      )}

      <Card title="Demographics & Contact Information">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              disabled
              style={{ background: '#f8fafc' }}
            />

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={genderOptions}
              placeholder="Select gender"
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />

            <div style={{ gridColumn: '1 / -1' }}>
              <Input
                label="Home Address"
                name="address"
                placeholder="123 Health Ave, Suite 400, New York, NY"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <Input
                label="Emergency Contact (Name & Phone)"
                name="emergencyContact"
                placeholder="Jane Doe — +1 (555) 999-8888 (Spouse)"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="primary" loading={saving}>
              {saving ? 'Saving Changes...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PatientProfile;
