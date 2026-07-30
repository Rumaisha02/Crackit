import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Icon } from './ui/Icon';

export const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontWeight: 700 }}>
        <div className="nb-card" style={{ backgroundColor: 'var(--primary-yellow)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* ⚡ → Zap */}
          <Icon name="Zap" context="button" />
          Loading Career Tracker...
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
