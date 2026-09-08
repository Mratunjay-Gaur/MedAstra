// MedAstra — Dialog (Modal) UI Component
import React, { useEffect } from 'react';

const Dialog = ({ isOpen, onClose, title, children }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  };

  const modalStyle = {
    background: '#fff',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: '520px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--border)',
  };

  const closeBtnStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    lineHeight: 1,
    padding: '0.25rem',
  };

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div style={modalStyle} role="dialog" aria-modal="true" aria-label={title}>
        {title && (
          <div style={headerStyle}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{title}</h2>
            <button onClick={onClose} style={closeBtnStyle} aria-label="Close dialog">
              ×
            </button>
          </div>
        )}
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
