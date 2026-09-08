// MedAstra — Input UI Component
import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
  required = false,
  disabled = false,
  style: extraStyle = {},
}) => {
  const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.875rem',
    border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
    borderRadius: 'var(--radius)',
    fontSize: '0.9rem',
    color: 'var(--text)',
    background: disabled ? '#f1f5f9' : '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    ...extraStyle,
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 600,
    fontSize: '0.85rem',
    color: 'var(--text)',
    marginBottom: '0.35rem',
  };

  const errorStyle = {
    color: 'var(--danger)',
    fontSize: '0.78rem',
    marginTop: '0.25rem',
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label htmlFor={name} style={labelStyle}>
          {label}
          {required && <span style={{ color: 'var(--danger)', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={inputStyle}
        onFocus={(e) => {
          if (!error) e.target.style.borderColor = 'var(--primary)';
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderColor = 'var(--border)';
        }}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default Input;
