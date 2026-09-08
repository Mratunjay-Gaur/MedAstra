// MedAstra — Button UI Component
import React from 'react';

const variantStyles = {
  primary: {
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    background: 'var(--secondary)',
    color: '#fff',
    border: 'none',
  },
  danger: {
    background: 'var(--danger)',
    color: '#fff',
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--primary)',
    border: '1px solid var(--primary)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid var(--border)',
  },
};

const sizeStyles = {
  sm: { padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderRadius: '0.375rem' },
  md: { padding: '0.5rem 1.25rem', fontSize: '0.9rem', borderRadius: '0.5rem' },
  lg: { padding: '0.75rem 1.75rem', fontSize: '1rem', borderRadius: '0.5rem' },
};

const Spinner = () => (
  <svg
    style={{ animation: 'spin 0.8s linear infinite', width: '1em', height: '1em' }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    <circle
      style={{ opacity: 0.25 }}
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      style={{ opacity: 0.75 }}
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  loading = false,
  style: extraStyle = {},
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.65 : 1,
    transition: 'opacity 0.2s, background 0.2s, transform 0.1s',
    width: fullWidth ? '100%' : 'auto',
    lineHeight: 1.4,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...extraStyle,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={baseStyle}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
