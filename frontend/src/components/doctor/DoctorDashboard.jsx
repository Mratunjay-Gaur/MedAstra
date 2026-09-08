// MedAstra — DoctorDashboard Component
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePatients } from '../../hooks/usePatients.js';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import Alert from '../ui/Alert.jsx';
import Loader from '../common/Loader.jsx';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { patients, loading, error } = usePatients();

  if (loading) {
    return <Loader message="Loading clinician caseload..." />;
  }

  const recentPatients = patients.slice(0, 5);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
            Clinician Portal • MedAstra
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>
            Welcome, Dr. {user?.name || 'Doctor'}
          </h1>
          <p style={{ marginTop: '0.5rem', opacity: 0.95, fontSize: '0.95rem' }}>
            AI-Assisted Patient Case Taking system is active. Review intake records and manage clinical caseloads.
          </p>
        </div>
        <div>
          <Link to="/doctor/patients">
            <Button
              variant="outline"
              size="md"
              style={{ background: '#ffffff', color: 'var(--secondary)', border: 'none' }}
            >
              🔍 View All Patients
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Alert type="error" message={error} />
        </div>
      )}

      {/* Statistics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        <Card padding="1.25rem">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Total Assigned Patients
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {patients.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>
            ✓ Active in system
          </div>
        </Card>

        <Card padding="1.25rem">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Recent Intakes
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '0.25rem' }}>
            {recentPatients.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Past 7 days
          </div>
        </Card>

        <Card padding="1.25rem">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Clinical Status
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.5rem' }}>
            Ready
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Intake engine available
          </div>
        </Card>
      </div>

      {/* Recent Patients Table / List */}
      <Card
        title="Recent Patients"
        subtitle="Quick access to latest registered patient records"
      >
        {recentPatients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <p>No patients recorded in this clinic yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '0.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>NAME</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>EMAIL / USER</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>GENDER</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>PHONE</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((p) => {
                  const patientUser = p.userId || {};
                  return (
                    <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>
                        {patientUser.name || 'Patient'}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                        {patientUser.email || '—'}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        {p.gender || '—'}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        {p.phone || '—'}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <Badge variant="success">Active</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/doctor/patients">
            <Button variant="outline" size="sm">
              Manage All Patients →
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
