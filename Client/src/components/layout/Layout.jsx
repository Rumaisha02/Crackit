import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1.5rem 2rem', backgroundColor: 'var(--bg-canvas)' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
