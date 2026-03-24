import React from 'react';

export default function MobileTopBar({ onMenuOpen }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      background: 'var(--figma-surface)',
      borderBottom: '1px solid var(--figma-border)',
      flexShrink: 0,
      zIndex: 50,
    }}>
      {/* Avatar */}
      <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
        <img src="/pj-avatar.webp" alt="PJ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Name */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--figma-text)', lineHeight: 1.2 }}>Piyush Jain</div>
        <div style={{ fontSize: 13, color: 'var(--figma-text-secondary)', lineHeight: 1.2 }}>Portfolio</div>
      </div>

      {/* Hamburger */}
      <div onClick={onMenuOpen} style={{ cursor: 'pointer', padding: 4, color: 'var(--figma-text)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </div>
    </div>
  );
}
