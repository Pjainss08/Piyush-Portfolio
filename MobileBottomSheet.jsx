import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PAGES, SOCIAL_LINKS } from './canvasData.js';

// Pikaicons stroke SVG paths
const socialIcons = {
  'X (Twitter)': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18.667 4-5.527 6.316M4.667 20l5.895-6.737m2.578-2.947L9.304 4.9c-.233-.33-.35-.494-.5-.613a1.3 1.3 0 0 0-.45-.233C8.169 4 7.967 4 7.564 4H6.063c-.667 0-1 0-1.18.138a.67.67 0 0 0-.26.502c-.009.227.184.499.57 1.043l5.369 7.58m2.578-2.947 5.668 8c.385.545.578.817.569 1.044a.67.67 0 0 1-.26.502c-.18.138-.513.138-1.18.138h-1.5c-.404 0-.606 0-.79-.054a1.3 1.3 0 0 1-.45-.233c-.151-.119-.268-.284-.501-.613l-4.134-5.837" />
    </svg>
  ),
  'LinkedIn': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 17v-3.5a2.5 2.5 0 0 0-5 0m0 0V17m0-3.5v-3m-4 0V17M8 7v.01" />
      <path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" />
    </svg>
  ),
  'Instagram': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 7h.01M3 12c0-2.514 0-3.77.354-4.78a6.3 6.3 0 0 1 3.865-3.866C8.23 3 9.486 3 12 3s3.77 0 4.78.354a6.3 6.3 0 0 1 3.866 3.865C21 8.23 21 9.486 21 12s0 3.77-.354 4.78a6.3 6.3 0 0 1-3.865 3.866C15.77 21 14.514 21 12 21s-3.77 0-4.78-.354a6.3 6.3 0 0 1-3.866-3.865C3 15.77 3 14.514 3 12Zm12.778-.56a3.819 3.819 0 1 1-7.555 1.12 3.819 3.819 0 0 1 7.554-1.12Z" />
    </svg>
  ),
  'Email': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.803 7.762-5.508 3.505c-1.557.99-2.335 1.486-3.171 1.678a5 5 0 0 1-2.248 0c-.836-.192-1.614-.688-3.171-1.678L2.197 7.762m19.606 0C22 8.722 22 10.006 22 12c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185C18.2 20 16.8 20 14 20h-4c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C2 16.2 2 14.8 2 12c0-1.994 0-3.278.197-4.238m19.606 0a4 4 0 0 0-.348-1.032 5 5 0 0 0-2.185-2.185C18.2 4 16.8 4 14 4h-4c-2.8 0-4.2 0-5.27.545A5 5 0 0 0 2.545 6.73a4 4 0 0 0-.348 1.032" />
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

            {/* Page nav items — no dividers */}
            {PAGES.map(page => (
              <div
                key={page.id}
                onClick={() => onPageChange(page.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', cursor: 'pointer',
                }}
              >
                <span style={{
                  fontSize: 18, fontWeight: activePage === page.id ? 600 : 400,
                  color: activePage === page.id ? 'var(--figma-text)' : 'var(--figma-text-secondary)',
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

            {/* Dark Mode row with toggle */}
            <div
              onClick={onToggleTheme}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0', cursor: 'pointer',
              }}
            >
              <span style={{
                fontSize: 18, fontWeight: 400,
                color: 'var(--figma-text-secondary)',
              }}>
                Dark Mode
              </span>
              {/* Toggle switch */}
              <div style={{
                width: 44, height: 26, borderRadius: 13,
                background: isDark ? '#0d99ff' : '#ccc',
                position: 'relative',
                transition: 'background 0.2s',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: 2,
                  left: isDark ? 20 : 2,
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              </div>
            </div>

            {/* Social icons row at bottom */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28,
              paddingTop: 16,
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
                    display: 'flex',
                  }}
                >
                  {socialIcons[link.label]}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Toast */}
          {emailCopied && (
            <div style={{
              position: 'fixed',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1e1e1e',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Figtree', sans-serif",
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              zIndex: 1000,
            }}>
              Email copied ✓
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
