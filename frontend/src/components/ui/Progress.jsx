// MedAstra — Progress Bar UI Component
import React from 'react';

const Progress = ({ value = 0, label, color = 'var(--primary)' }) => {
  const clamped = Math.min(100, Math.max(0, value));

  const trackStyle = {
    width: '100%',
    height: '8px',
    background: 'var(--border)',
    borderRadius: '9999px',
    overflow: 'hidden',
  };

  const fillStyle = {
    height: '100%',
    width: `${clamped}%`,
    background: color,
    borderRadius: '9999px',
    transition: 'width 0.4s ease',
  };

  const labelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginBottom: '0.375rem',
  };

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      {(label !== undefined || value !== undefined) && (
        <div style={labelStyle}>
          {label && <span>{label}</span>}
          <span>{clamped}%</span>
        </div>
      )}
      <div style={trackStyle} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div style={fillStyle} />
      </div>
    </div>
  );
};

export default Progress;
