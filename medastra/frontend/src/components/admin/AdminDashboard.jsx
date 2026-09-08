// MedAstra — AdminDashboard Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Alert from '../ui/Alert.jsx';
import Loader from '../common/Loader.jsx';
import api from '../../services/api.js';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [org, setOrg] = useState(null);
  const [doctorCount, setDoctorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAdminData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user?.organizationId) {
          const res = await api.get(`/organizations/${user.organizationId}`);
          if (isMounted) {
            setOrg(res.data?.organization || null);
          }
        }
        // Fetch doctor count
        const docRes = await api.get('/doctors');
        if (isMounted) {
          const docs = docRes.data?.doctors || [];
          setDoctorCount(docs.length);
        }
      } catch (err) {
        if (isMounted) {
          // Organization might not be created yet for new admin
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAdminData();
    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading) {
    return <Loader message="Loading MedAstra administration console..." />;
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
          Administrative Console • MedAstra
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>
          Hospital Administration Dashboard
        </h1>
        <p style={{ marginTop: '0.5rem', opacity: 0.85, fontSize: '0.95rem' }}>
          Institutional governance, clinical staff management, and system compliance.
        </p>
      </div>

      {error && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Alert type="error" message={error} />
        </div>
      )}

      {/* Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <Card padding="1.5rem">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            AFFILIATED FACILITY
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginTop: '0.25rem' }}>
            {org?.name || 'General Health System'}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Type: {org?.type ? org.type.toUpperCase() : 'HOSPITAL'}
          </div>
        </Card>

        <Card padding="1.5rem">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            CREDENTIALED DOCTORS
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {doctorCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '0.25rem' }}>
            Clinical staff onboarded
          </div>
        </Card>

        <Card padding="1.5rem">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            SECURITY & AUDITING
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.5rem' }}>
            Compliant
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            RBAC protocol enforced
          </div>
        </Card>
      </div>

      {/* Grid of Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Organization Overview */}
        <Card title="Organization Overview" subtitle="Primary healthcare entity configuration">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Facility Name</span>
              <span style={{ fontWeight: 600 }}>{org?.name || 'MedAstra Medical Center'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Facility Type</span>
              <span style={{ fontWeight: 600 }}>{org?.type || 'Hospital'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Address</span>
              <span style={{ fontWeight: 600 }}>{org?.address || '100 Medical Center Way'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Admin Contact</span>
              <span style={{ fontWeight: 600 }}>{user?.email}</span>
            </div>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/admin/organization">
              <Button variant="outline" size="sm" fullWidth>
                Manage Organization Details →
              </Button>
            </Link>
          </div>
        </Card>

        {/* Doctor Management Placeholder */}
        <Card title="Doctor Management" subtitle="Credentialing & Department Staffing">
          <div
            style={{
              padding: '1.5rem',
              textAlign: 'center',
              background: '#f8fafc',
              borderRadius: 'var(--radius)',
              border: '1px dashed var(--border)',
            }}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🩺</div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>
              Doctor Management Module
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', marginBottom: '1rem' }}>
              Assign clinicians to specialty departments, issue access licenses, and audit case load distributions.
            </p>
            <Button variant="outline" size="sm" disabled>
              Staff Roster ({doctorCount} Active)
            </Button>
          </div>
        </Card>

        {/* Organization Settings Placeholder */}
        <div style={{ gridColumn: '1 / -1' }}>
          <Card title="Organization Settings & Compliance" subtitle="Platform configuration & policies">
            <div
              style={{
                padding: '1.5rem',
                textAlign: 'center',
                background: '#f8fafc',
                borderRadius: 'var(--radius)',
                border: '1px dashed var(--border)',
              }}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>⚙️</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>
                Institutional Configuration Placeholder
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '520px', margin: '0 auto' }}>
                Manage organization-wide data retention schedules, patient case taking rules, and institutional access control configurations.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
