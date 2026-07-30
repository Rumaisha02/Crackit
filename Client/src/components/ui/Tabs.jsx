import React from 'react';

export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`nb-tab ${isActive ? 'nb-tab-active' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: isActive ? 'var(--border-dark)' : 'rgba(128,128,128,0.2)',
                  color: isActive ? 'var(--bg-canvas)' : 'var(--text-primary)',
                  borderRadius: '4px',
                  padding: '0.1rem 0.4rem',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
