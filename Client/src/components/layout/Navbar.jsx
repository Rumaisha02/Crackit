import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../ui/Icon';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        backgroundColor: 'var(--surface-white)',
        borderBottom: '3px solid var(--border-dark)',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      {/* Logo / Brand */}
      <Link
        to="/dashboard"
        style={{
          textDecoration: 'none',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--primary-yellow)',
            border: '2px solid var(--border-dark)',
            padding: '0.25rem 0.6rem',
            fontWeight: 800,
            borderRadius: '4px',
            boxShadow: '2px 2px 0px var(--shadow-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#000000',
          }}
        >
          {/* ⚡ → Zap */}
          <Icon name="Zap" context="button" />
          CAREER TRACKER
        </div>
      </Link>

      {/* Right side: theme toggle + user pill + logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Theme Toggle — Sun in dark mode, Moon in light mode */}
        <button
          onClick={toggleTheme}
          className="nb-btn nb-btn-white"
          style={{ padding: '0.4rem 0.65rem', fontSize: '0.85rem' }}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          aria-label="Toggle theme"
        >
          <Icon name={theme === 'light' ? 'Moon' : 'Sun'} context="navigation" />
        </button>

        {user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-canvas)',
              border: '2px solid var(--border-dark)',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '2px 2px 0px var(--shadow-color)',
              color: 'var(--text-primary)',
            }}
          >
            {/* 👋 → User icon */}
            <Icon name="User" context="status" />
            <span>{user.name}</span>
          </div>
        )}

        <button
          onClick={logout}
          className="nb-btn nb-btn-danger"
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
        >
          {/* 🚪 → LogOut */}
          <Icon name="LogOut" context="button" />
          Logout
        </button>
      </div>
    </header>
  );
};
