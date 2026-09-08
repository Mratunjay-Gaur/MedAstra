// MedAstra — Sidebar Component
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROLES } from '../../utils/constants.js';

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role;

  const getNavLinks = () => {
    switch (role) {
      case ROLES.PATIENT:
        return [
          { to: '/patient/dashboard', label: 'Dashboard', icon: '📊' },
          { to: '/patient/profile', label: 'Profile', icon: '👤' },
        ];
      case ROLES.DOCTOR:
        return [
          { to: '/doctor/dashboard', label: 'Dashboard', icon: '🩺' },
          { to: '/doctor/patients', label: 'Patients', icon: '👥' },
        ];
      case ROLES.ADMIN:
        return [
          { to: '/admin/dashboard', label: 'Dashboard', icon: '⚡' },
          { to: '/admin/organization', label: 'Organization', icon: '🏢' },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside
      style={{
        width: 'var(--sidebar-width, 240px)',
        background: '#ffffff',
        borderRight: '1px solid var(--border)',
        minHeight: 'calc(100vh - var(--header-height, 64px))',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem 0.75rem',
      }}
    >
      <div style={{ padding: '0 0.5rem 1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
        Navigation
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius)',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: isActive ? '#ffffff' : 'var(--text)',
              background: isActive ? 'var(--primary)' : 'transparent',
              textDecoration: 'none',
              transition: 'background 0.15s, color 0.15s',
            })}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', padding: '1rem 0.5rem 0', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <p style={{ fontWeight: 600, color: 'var(--text)' }}>MedAstra Platform</p>
        <p>AI-Assisted Patient Case Taking</p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.7rem' }}>Phase 1 v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
