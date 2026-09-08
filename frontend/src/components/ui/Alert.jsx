// MedAstra — Alert UI Component
import React from 'react';

const typeConfig = {
  success: { bg: '#ecfdf5', border: '#a7f3d0', color: '#065f46', icon: '✅' },
  error: { bg: '#fef2f2', border: '#fecaca', color: '#991b1b', icon: '❌' },
  warning: { bg: '#fffbeb', border: '#fde68a', color: '#92400e', icon: '⚠️' },
  info: { bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af', icon: 'ℹ️' },
};

const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const config = typeConfig[type] || typeConfig.info;

  const alertStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.625rem',
    padding: '0.875rem 1rem',
    borderRadius: 'var(--radius)',
    border: `1px solid ${config.border}`,
    background: config.bg,
    color: config.color,
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1rem',
  };

  const closeStyle = {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    color: config.color,
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: 1,
    padding: '0 0.25rem',
    flexShrink: 0,
  };

  return (
    <div style={alertStyle} role="alert">
      <span>{config.icon}</span>
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button onClick={onClose} style={closeStyle} aria-label="Close alert">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
