// MedAstra — PatientDashboard Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Alert from '../ui/Alert.jsx';
import Loader from '../common/Loader.jsx';
import api from '../../services/api.js';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPatientData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/auth/me');
        if (isMounted) {
          const u = res.data?.user || res.data;
          setProfile(u?.profile || null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Could not retrieve full profile details from the server.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPatientData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <Loader message="Loading MedAstra patient records..." />;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
          MedAstra Patient Portal
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>
          Welcome, {user?.name || 'Patient'}
        </h1>
        <p style={{ marginTop: '0.5rem', opacity: 0.95, fontSize: '0.95rem', maxWidth: '600px' }}>
          Your verified personal health space. Manage your baseline clinical information, emergency contacts, and active case history.
        </p>
      </div>

      {error && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Alert type="warning" message={error} />
        </div>
      )}

      {/* Grid of details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Personal & Demographic Information */}
        <Card title="Personal Information" subtitle="Demographics on record">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Full Name</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Gender</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{profile?.gender || 'Not specified'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Date of Birth</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not specified'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Phone</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{profile?.phone || 'Not specified'}</span>
            </div>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/patient/profile">
              <Button variant="outline" size="sm" fullWidth>
                Update Profile Information
              </Button>
            </Link>
          </div>
        </Card>

        {/* Profile Summary & Emergency Details */}
        <Card title="Profile Summary" subtitle="Emergency contacts and residence">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Emergency Contact</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{profile?.emergencyContact || 'Not specified'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Address</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{profile?.address || 'Not specified'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Account Status</span>
              <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.85rem' }}>Active Patient</span>
            </div>
          </div>
        </Card>

        {/* Basic Health Information Placeholder */}
        <div style={{ gridColumn: '1 / -1' }}>
          <Card title="Clinical Records & Care Overview" subtitle="Phase 1 Baseline Record">
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                background: '#f8fafc',
                borderRadius: 'var(--radius)',
                border: '1px dashed var(--border)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>
                Health Information Placeholder
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '500px', margin: '0 auto' }}>
                Structured clinical case histories and clinician consultations are safely archived here. All active consultations will appear in this workspace.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
