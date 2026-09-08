// MedAstra — OrganizationPage Component
import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Select from '../../components/ui/Select.jsx';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/ui/Alert.jsx';
import Loader from '../../components/common/Loader.jsx';
import api from '../../services/api.js';

const orgTypeOptions = [
  { value: 'hospital', label: 'Hospital' },
  { value: 'clinic', label: 'Clinic' },
];

const OrganizationPage = () => {
  const { user } = useAuth();
  const [orgId, setOrgId] = useState(user?.organizationId || null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'hospital',
    address: '',
    contact: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchOrg = async () => {
      setLoading(true);
      setError(null);
      try {
        if (orgId) {
          const res = await api.get(`/organizations/${orgId}`);
          if (isMounted) {
            const org = res.data?.organization;
            if (org) {
              setFormData({
                name: org.name || '',
                type: org.type || 'hospital',
                address: org.address || '',
                contact: org.contact || '',
              });
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          // No organization yet or failed
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrg();
    return () => {
      isMounted = false;
    };
  }, [orgId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    if (!formData.name.trim()) {
      setError('Organization name is required.');
      setSaving(false);
      return;
    }

    try {
      if (orgId) {
        await api.put(`/organizations/${orgId}`, formData);
        setMessage('Organization details updated successfully.');
      } else {
        const res = await api.post('/organizations', formData);
        const created = res.data?.organization;
        if (created?._id) {
          setOrgId(created._id);
        }
        setMessage('Organization created successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save organization details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <Loader message="Loading organization settings..." />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>
            Organization Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Configure your healthcare facility profile and institutional contact details.
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

        <Card title="Facility Details">
          <form onSubmit={handleSubmit}>
            <Input
              label="Organization / Facility Name"
              name="name"
              placeholder="e.g. St. Jude General Hospital"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Select
              label="Facility Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={orgTypeOptions}
              required
            />

            <Input
              label="Facility Physical Address"
              name="address"
              placeholder="e.g. 500 Medical Center Parkway, Suite 100"
              value={formData.address}
              onChange={handleChange}
            />

            <Input
              label="Administrative Contact (Phone or Email)"
              name="contact"
              placeholder="e.g. admin@stjudehospital.org or +1 (555) 123-4567"
              value={formData.contact}
              onChange={handleChange}
            />

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="primary" loading={saving}>
                {saving ? 'Saving...' : orgId ? 'Update Organization' : 'Create Organization'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default OrganizationPage;
