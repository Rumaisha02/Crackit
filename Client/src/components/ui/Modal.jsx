import React from 'react';
import { Icon } from './Icon';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="nb-modal-overlay" onClick={onClose}>
      <div className="nb-modal" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            borderBottom: '3px solid var(--border-dark)',
            paddingBottom: '0.75rem',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800 }}>{title}</h2>
          <button
            onClick={onClose}
            className="nb-btn nb-btn-danger"
            style={{ padding: '0.2rem 0.6rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}
            aria-label="Close modal"
          >
            <Icon name="X" context="button" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
