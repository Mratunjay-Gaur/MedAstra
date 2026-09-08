// MedAstra — Badge UI Component
import React from 'react';

const variantStyles = {
  success: { background: '#d1fae5', color: '#065f46' },
  warning: { background: '#fef3c7', color: '#92400e' },
  error: { background: '#fee2e2', color: '#991b1b' },
  info: { background: '#dbeafe', color: '#1e40af' },
  default: { background: '#f1f5f9', color: '#475569' },
  primary: { background: '#e0f2fe', color: '#0369a1' },
  secondary: { background: '#ede9fe', color: '#5b21b6' },
};

const Badge = ({ children, variant = 'default' }) => {
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2rem 0.6rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...(variantStyles[variant] || variantStyles.default),
  };

  return <span style={style}>{children}</span>;
};

export default Badge;
