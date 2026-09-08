// MedAstra — Loader Component
import React from 'react';

const Loader = ({ message = 'Loading...' }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    gap: '1rem',
  };

  const spinnerStyle = {
    width: '48px',
    height: '48px',
    border: '4px solid var(--border)',
    borderTop: '4px solid var(--primary)',
    borderRadius: '50%',
    animation: 'medastraSpinAnim 0.8s linear infinite',
  };

  return (
    <div style={containerStyle} role="status" aria-live="polite">
      <style>{`
        @keyframes medastraSpinAnim {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={spinnerStyle} />
      <div style={{ textAlign: 'center' }}>
        <span className="medastra-brand" style={{ fontSize: '1.1rem' }}>
          MedAstra
        </span>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Loader;
