import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../ui/Icon';

const navItems = [
  { label: 'Dashboard',   path: '/dashboard',   icon: 'LayoutDashboard' },
  { label: 'Internships', path: '/internships',  icon: 'GraduationCap'   },
  { label: 'Profile',     path: '/profile',      icon: 'FileText'        },
];

export const Sidebar = () => {
  return (
    <aside
      style={{
        width: '220px',
        backgroundColor: 'var(--surface-white)',
        borderRight: '3px solid var(--border-dark)',
        padding: '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        minHeight: 'calc(100vh - 65px)',
      }}
    >
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          opacity: 0.5,
          marginBottom: '0.25rem',
          paddingLeft: '0.5rem',
        }}
      >
        Navigation
      </div>

      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nb-btn ${isActive ? 'nb-btn-primary' : 'nb-btn-white'}`
          }
          style={{
            justifyContent: 'flex-start',
            width: '100%',
            gap: '0.6rem',
            alignItems: 'center',
          }}
        >
          {/* Icon via centralised wrapper — navigation context = 20px, stroke 2.5 */}
          <Icon name={item.icon} context="navigation" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
};
