// MedAstra — Select UI Component
import React from 'react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder = 'Select...',
}) => {
  const selectStyle = {
    width: '100%',
    padding: '0.6rem 0.875rem',
    border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
    borderRadius: 'var(--radius)',
    fontSize: '0.9rem',
    color: 'var(--text)',
    background: disabled ? '#f1f5f9' : '#fff',
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxSizing: 'border-box',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.875rem center',
    paddingRight: '2.5rem',
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        style={selectStyle}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

export default Select;
