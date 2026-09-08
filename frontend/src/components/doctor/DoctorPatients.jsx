// MedAstra — DoctorPatients Component
import React, { useState, useMemo } from 'react';
import { usePatients } from '../../hooks/usePatients.js';
import Card from '../ui/Card.jsx';
import Input from '../ui/Input.jsx';
import Badge from '../ui/Badge.jsx';
import Alert from '../ui/Alert.jsx';
import Loader from '../common/Loader.jsx';
import Button from '../ui/Button.jsx';

const calculateAge = (dobString) => {
  if (!dobString) return null;
  const birth = new Date(dobString);
  if (isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const DoctorPatients = () => {
  const { patients, loading, error, refetch } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients;
    const term = searchTerm.toLowerCase();
    return patients.filter((p) => {
      const name = p.userId?.name?.toLowerCase() || '';
      const email = p.userId?.email?.toLowerCase() || '';
      const phone = p.phone?.toLowerCase() || '';
      return name.includes(term) || email.includes(term) || phone.includes(term);
    });
  }, [patients, searchTerm]);

  if (loading) {
    return <Loader message="Fetching patient directory..." />;
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>
            Patient Directory
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Clinical roster of registered patients in your department.
          </p>
        </div>
        <div>
          <Button variant="outline" size="sm" onClick={refetch}>
            🔄 Refresh List
          </Button>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Alert type="error" message={error} />
        </div>
      )}

      {/* Search Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Input
          placeholder="🔍 Search patients by name, email, or phone number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patient Table / Cards */}
      <Card>
        {filteredPatients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>👥</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>
              {patients.length === 0 ? 'No patients currently registered' : 'No patients match your search query'}
            </h3>
            <p style={{ fontSize: '0.85rem' }}>
              {patients.length === 0
                ? 'When patients register on MedAstra, their records will automatically appear here.'
                : 'Try clearing your search term to view all records.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <th style={{ padding: '0.85rem 0.75rem' }}>PATIENT NAME</th>
                  <th style={{ padding: '0.85rem 0.75rem' }}>AGE / DOB</th>
                  <th style={{ padding: '0.85rem 0.75rem' }}>GENDER</th>
                  <th style={{ padding: '0.85rem 0.75rem' }}>CONTACT DETAILS</th>
                  <th style={{ padding: '0.85rem 0.75rem' }}>EMERGENCY CONTACT</th>
                  <th style={{ padding: '0.85rem 0.75rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((p) => {
                  const patientUser = p.userId || {};
                  const age = calculateAge(p.dateOfBirth);
                  const dobText = p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : 'N/A';

                  return (
                    <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text)' }}>
                          {patientUser.name || 'Anonymous Patient'}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {patientUser.email || '—'}
                        </div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div>{age !== null ? `${age} yrs` : '—'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dobText}</div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        {p.gender || '—'}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <div>{p.phone || '—'}</div>
                        {p.address && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {p.address}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {p.emergencyContact || '—'}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <Badge variant="success">Active</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DoctorPatients;
