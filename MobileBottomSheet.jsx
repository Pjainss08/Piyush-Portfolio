import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PAGES, SOCIAL_LINKS } from './canvasData.js';

const socialIcons = {
  'X (Twitter)': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z" />
    </svg>
  ),
  'LinkedIn': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  'Instagram': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  'Email': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  ),
};

export default function MobileBottomSheet({ isOpen, onClose, activePage, onPageChange, isDark, onToggleTheme }) {
  const [emailCopied, setEmailCopied] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100,
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => { if (info.offset.y > 100) onClose(); }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 101,
              background: 'var(--figma-surface)',
              borderRadius: '20px 20px 0 0',
              padding: '12px 24px 32px',
              paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
              maxHeight: '70vh',
            }}
          >
            {/* Drag handle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--figma-border)' }} />
            </div>

            {/* Page nav items */}
            {PAGES.map(page => (
              <div
                key={page.id}
                onClick={() => onPageChange(page.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', cursor: 'pointer',
                  borderBottom: '1px solid var(--figma-border)',
                }}
              >
                <span style={{
                  fontSize: 18, fontWeight: activePage === page.id ? 600 : 400,
                  color: 'var(--figma-text)',
                }}>
                  {page.label}
                </span>
                {activePage === page.id && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                )}
              </div>
            ))}

            {/* Theme toggle */}
            <div
              onClick={onToggleTheme}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0', cursor: 'pointer',
                borderBottom: '1px solid var(--figma-border)',
              }}
            >
              <span style={{ fontSize: 18, color: 'var(--figma-text)' }}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
              <span style={{ color: 'var(--figma-text-secondary)' }}>
                {isDark ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </span>
            </div>

            {/* Social icons row */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 32,
              paddingTop: 20,
            }}>
              {SOCIAL_LINKS.map((link, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (link.email) {
                      navigator.clipboard.writeText(link.email);
                      setEmailCopied(true);
                      setTimeout(() => setEmailCopied(false), 2000);
                    } else {
                      window.open(link.url, '_blank');
                    }
                  }}
                  style={{
                    color: emailCopied && link.email ? '#0ACF83' : 'var(--figma-text-secondary)',
                    cursor: 'pointer', transition: 'color 0.2s',
                  }}
                >
                  {socialIcons[link.label]}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
