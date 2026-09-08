// MedAstra — Card UI Component
import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  padding = '1.5rem',
  style: extraStyle = {},
}) => {
  const cardStyle = {
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    padding,
    ...extraStyle,
  };

  const headerStyle = {
    marginBottom: title ? '1rem' : 0,
    borderBottom: title ? '1px solid var(--border)' : 'none',
    paddingBottom: title ? '0.75rem' : 0,
  };

  return (
    <div className={`medastra-card ${className}`} style={cardStyle}>
      {(title || subtitle) && (
        <div style={headerStyle}>
          {title && (
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
