// MedAstra — Header Component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleVariant = (role) => {
    switch (role) {
      case 'doctor':
        return 'info';
      case 'admin':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <header
      style={{
        height: 'var(--header-height, 64px)',
        background: '#ffffff',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🏥</span>
        <div>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>
            MedAstra
          </span>
          <span
            style={{
              marginLeft: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'none',
            }}
          >
            AI-Assisted Patient Case Taking
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                {user.name}
              </div>
              <div style={{ marginTop: '2px' }}>
                <Badge variant={getRoleVariant(user.role)}>
                  {user.role ? user.role.toUpperCase() : 'USER'}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
