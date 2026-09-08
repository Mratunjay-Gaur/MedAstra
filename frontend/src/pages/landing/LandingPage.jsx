// MedAstra — Professional Healthcare Landing Page
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <nav
        style={{
          background: '#ffffff',
          borderBottom: '1px solid var(--border)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.75rem' }}>🏥</span>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1 }}>
              MedAstra
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              AI-Assisted Patient Case Taking
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          padding: '5rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              background: '#e0f2fe',
              color: '#0369a1',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            Clinical Precision & Intelligent Case Management
          </span>
          <h1
            style={{
              fontSize: '2.75rem',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              letterSpacing: '-0.5px',
            }}
          >
            MedAstra — Intelligent Healthcare Case Taking
          </h1>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            Seamlessly connecting patients, clinicians, and hospital systems to streamline clinical consultations, maintain structured health records, and optimize care workflows.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/signup">
              <Button size="lg" variant="primary">
                Register as Patient or Doctor
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Access Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '4.5rem 2rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
            How MedAstra Works
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            A structured, three-tiered clinical case flow designed for accuracy and privacy
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <Card padding="2rem">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text)' }}>
              1. Case Initiation
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Patients securely record their history, profile details, and baseline medical information into structured, encrypted records.
            </p>
          </Card>

          <Card padding="2rem">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🩺</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text)' }}>
              2. Clinician Review
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Doctors quickly access verified patient rosters, demographic summaries, and case timelines through dedicated clinical dashboards.
            </p>
          </Card>

          <Card padding="2rem">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏥</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text)' }}>
              3. Hospital Governance
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Administrators oversee department workloads, institutional protocols, and audit logs to maintain regulatory compliance.
            </p>
          </Card>
        </div>
      </section>

      {/* Stakeholder Sections */}
      <section style={{ background: '#ffffff', padding: '4.5rem 2rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text)' }}>
              Built For Every Healthcare Role
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* For Patients */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', background: '#f8fafc' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                👤 For Patients
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Empowering individuals with transparent, structured access to health documentation.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>✓ Unified medical profile and demographic updates</li>
                <li>✓ Clear view of care teams and assigned primary clinicians</li>
                <li>✓ Direct control over emergency contact details</li>
                <li>✓ Privacy-first data protection and role isolation</li>
              </ul>
            </div>

            {/* For Doctors */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', background: '#f8fafc' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                🩺 For Doctors
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Optimizing case preparation time so doctors can focus on diagnostic care.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>✓ Structured patient rosters with rapid search</li>
                <li>✓ High-level caseload summaries and activity status</li>
                <li>✓ Centralized clinical data ingestion</li>
                <li>✓ Instant verification of patient histories</li>
              </ul>
            </div>

            {/* For Hospitals */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', background: '#f8fafc' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#059669', marginBottom: '0.5rem' }}>
                🏢 For Hospitals
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Institutional security, department coordination, and audit transparency.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>✓ Multi-clinic and hospital branch configuration</li>
                <li>✓ Administrative oversight of doctor credentials</li>
                <li>✓ Strict role-based access control (RBAC)</li>
                <li>✓ Standardized record retention and audit trails</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', background: '#f0f9ff' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>
            Ready to experience MedAstra?
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
            Get started today with modern, secure, and structured healthcare management.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="primary">
              Create Your Account Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          background: '#ffffff',
          borderTop: '1px solid var(--border)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
          MedAstra
        </div>
        <div style={{ marginBottom: '1rem' }}>
          AI-Assisted Patient Case Taking Platform • Phase 1
        </div>
        <div>
          © {new Date().getFullYear()} MedAstra Health Systems. Confidential & Secure.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
