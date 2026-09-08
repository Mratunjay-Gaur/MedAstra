// MedAstra — Tabs UI Component
import React from 'react';

const Tabs = ({ tabs = [], activeTab, onChange }) => {
  const containerStyle = {
    display: 'flex',
    borderBottom: '2px solid var(--border)',
    marginBottom: '1.5rem',
    gap: '0.5rem',
  };

  const tabStyle = (isActive) => ({
    padding: '0.6rem 1.25rem',
    fontSize: '0.9rem',
    fontWeight: isActive ? 700 : 500,
    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
    background: 'none',
    border: 'none',
    borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
    marginBottom: '-2px',
    cursor: 'pointer',
    transition: 'color 0.2s, border-color 0.2s',
    borderRadius: '0.375rem 0.375rem 0 0',
  });

  return (
    <div style={containerStyle} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          style={tabStyle(activeTab === tab.id)}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
