import React from 'react';

const STATUS_CONFIG = {
  wishlist: { label: 'Wishlist', bg: 'var(--accent-blue)', color: '#000' },
  applied: { label: 'Applied', bg: '#60A5FA', color: '#000' },
  screening: { label: 'Screening', bg: 'var(--accent-purple)', color: '#000' },
  interview: { label: 'Interview', bg: 'var(--primary-yellow)', color: '#000' },
  offer: { label: 'Offer', bg: 'var(--accent-green)', color: '#000' },
  selected: { label: 'Selected', bg: 'var(--accent-green)', color: '#000' },
  rejected: { label: 'Rejected', bg: 'var(--accent-pink)', color: '#000' },
};

export const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status?.toLowerCase()] || { label: status, bg: 'var(--surface-white)', color: '#000' };

  return (
    <span
      className="nb-badge"
      style={{
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
};
