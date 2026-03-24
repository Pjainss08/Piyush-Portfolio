import React, { useState, useRef } from 'react';
import { SOCIAL_LINKS } from './canvasData.js';

const MOBILE_ITEMS = [
  { id: 'notebook', src: '/notebook.png', x: 0, y: 15, w: 35, rotate: -3, zIndex: 0 },
  { id: 'srk', src: '/sticker-srk.png', x: 25, y: 0, w: 20, rotate: -5, zIndex: 2 },
  { id: 'polaroid-me', src: '/polaroid-me.png', x: 28, y: 12, w: 35, rotate: -6, zIndex: 3 },
  { id: 'vinyl', src: '/vinyl-record.png', x: 58, y: 2, w: 18, rotate: 8, zIndex: 4 },
  { id: 'polaroid-mt', src: '/polaroid-mountain.png', x: 55, y: 12, w: 32, rotate: 4, zIndex: 3 },
  { id: 'blob', src: '/sticker-blob.png', x: 82, y: 0, w: 10, rotate: 6, zIndex: 5 },
  { id: 'book', src: '/book-show-your-work.png', x: 70, y: 6, w: 28, rotate: 5, zIndex: 2 },
  { id: 'spiderman', src: '/sticker-spiderman.png', x: 8, y: 55, w: 20, rotate: -2, zIndex: 1 },
  { id: 'king', src: '/sticker-king.png', x: 76, y: 38, w: 22, rotate: -2, zIndex: 4 },
  { id: 'pantone', src: '/pantone.png', x: 62, y: 50, w: 18, rotate: -4, zIndex: 5, sticker: true },
];

const socialIcons = {
  'X (Twitter)': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l6.5 8L4 20h2l5.5-6.5L16 20h4l-6.5-8L20 4h-2l-5.5 6.5L8 4H4z" />
    </svg>
  ),
  'LinkedIn': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  'Instagram': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  'Email': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  ),
};

function MobileDraggableItem({ item, containerWidth }) {
  const px = (item.x / 100) * containerWidth;
  const py = (item.y / 100) * containerWidth;
  const pw = (item.w / 100) * containerWidth;

  const [pos, setPos] = useState({ x: px, y: py });
  const [dragging, setDragging] = useState(false);
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { tX: touch.clientX, tY: touch.clientY, itemX: pos.x, itemY: pos.y };
  };

  const handleTouchMove = (e) => {
    if (!touchStart.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dx = touch.clientX - touchStart.current.tX;
    const dy = touch.clientY - touchStart.current.tY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setDragging(true);
    setPos({ x: touchStart.current.itemX + dx, y: touchStart.current.itemY + dy });
  };

  const handleTouchEnd = () => {
    touchStart.current = null;
    setTimeout(() => setDragging(false), 0);
  };

  if (item.sticker) {
    return (
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'absolute', left: pos.x, top: pos.y,
          transform: `rotate(${item.rotate}deg)${dragging ? ' scale(1.05)' : ''}`,
          zIndex: dragging ? 999 : item.zIndex,
          transition: dragging ? 'none' : 'transform 0.2s',
          touchAction: 'none',
        }}
      >
        <div style={{
          padding: 3, background: 'transparent', borderRadius: 8,
        }}>
          <img src={item.src} alt="" draggable={false} style={{ width: pw, borderRadius: 6 }} />
        </div>
      </div>
    );
  }

  return (
    <img
      src={item.src}
      alt=""
      draggable={false}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'absolute', left: pos.x, top: pos.y,
        width: pw, borderRadius: 4,
        filter: 'drop-shadow(2px 3px 8px rgba(0,0,0,0.1))',
        transform: `rotate(${item.rotate}deg)${dragging ? ' scale(1.05)' : ''}`,
        zIndex: dragging ? 999 : item.zIndex,
        transition: dragging ? 'none' : 'transform 0.2s',
        touchAction: 'none',
      }}
    />
  );
}

export default function MobileAbout() {
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
  const [emailCopied, setEmailCopied] = useState(false);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Sticker collage area — takes most of the space */}
      <div style={{
        position: 'relative',
        width: '100%',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}>
        {MOBILE_ITEMS.map(item => (
          <MobileDraggableItem key={item.id} item={item} containerWidth={containerWidth} />
        ))}
      </div>

      {/* Bio text — fixed at bottom */}
      <div style={{
        flexShrink: 0,
        padding: '12px 28px 8px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: Math.min(containerWidth * 0.042, 17),
          fontWeight: 400,
          color: 'var(--figma-text)',
          lineHeight: 1.55,
          fontFamily: "'Figtree', sans-serif",
          letterSpacing: '-0.03em',
        }}>
          hello, i'm piyush jain a designer who loves to build & explore new things. currently exploring ai and products.
        </div>

        {/* Social links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          paddingTop: 14,
          paddingBottom: 8,
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
                cursor: 'pointer',
                transition: 'color 0.2s',
                display: 'flex',
              }}
            >
              {socialIcons[link.label]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
