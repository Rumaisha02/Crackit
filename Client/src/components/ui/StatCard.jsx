import React from 'react';
import { Icon } from './Icon';

export const StatCard = ({ title, count, bg, icon }) => {
  return (
    <div
      className="nb-card nb-card-hover"
      style={{
        backgroundColor: bg || 'var(--surface-white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: '180px',
        flex: '1 1 200px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </span>
        {/* icon = Lucide icon name string */}
        <Icon name={icon} context="card" />
      </div>
      <div style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1 }}>
        {count}
      </div>
    </div>
  );
};
