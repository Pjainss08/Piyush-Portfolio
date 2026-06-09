import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SOCIAL_LINKS } from './canvasData.js';

// Positions in % of collage container WIDTH for x, and % of collage HEIGHT for y.
const MOBILE_ITEMS = [
  { id: 'notebook', src: '/about/notebook.webp', x: 0, y: 18, w: 38, rotate: -3, zIndex: 0 },
  { id: 'srk', src: '/about/sticker-srk.webp', x: 28, y: 0, w: 18, rotate: -5, zIndex: 3 },
  { id: 'polaroid-me', src: '/about/polaroid-me.webp', x: 30, y: 16, w: 36, rotate: -6, zIndex: 2 },
  { id: 'vinyl', src: '/about/vinyl-record.webp', x: 56, y: 4, w: 16, rotate: 8, zIndex: 5 },
  { id: 'polaroid-mt', src: '/about/polaroid-mountain.webp', x: 60, y: 22, w: 34, rotate: 4, zIndex: 1 },
  { id: 'blob', src: '/about/sticker-blob.webp', x: 86, y: 6, w: 11, rotate: 6, zIndex: 4 },
  { id: 'book', src: '/about/book-show-your-work.webp', x: 70, y: 55, w: 28, rotate: 5, zIndex: 2 },
  { id: 'spiderman', src: '/about/sticker-spiderman.webp', x: 4, y: 64, w: 20, rotate: -2, zIndex: 3 },
  { id: 'king', src: '/about/sticker-king.webp', x: 50, y: 52, w: 22, rotate: -2, zIndex: 4 },
  { id: 'pantone', src: '/about/pantone.webp', x: 28, y: 62, w: 18, rotate: -4, zIndex: 5, sticker: true },
];

const socialIcons = {
  'X (Twitter)': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18.667 4-5.527 6.316M4.667 20l5.895-6.737m2.578-2.947L9.304 4.9c-.233-.33-.35-.494-.5-.613a1.3 1.3 0 0 0-.45-.233C8.169 4 7.967 4 7.564 4H6.063c-.667 0-1 0-1.18.138a.67.67 0 0 0-.26.502c-.009.227.184.499.57 1.043l5.369 7.58m2.578-2.947 5.668 8c.385.545.578.817.569 1.044a.67.67 0 0 1-.26.502c-.18.138-.513.138-1.18.138h-1.5c-.404 0-.606 0-.79-.054a1.3 1.3 0 0 1-.45-.233c-.151-.119-.268-.284-.501-.613l-4.134-5.837" />
    </svg>
  ),
  'LinkedIn': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 17v-3.5a2.5 2.5 0 0 0-5 0m0 0V17m0-3.5v-3m-4 0V17M8 7v.01" />
      <path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" />
    </svg>
  ),
  'Instagram': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 7h.01M3 12c0-2.514 0-3.77.354-4.78a6.3 6.3 0 0 1 3.865-3.866C8.23 3 9.486 3 12 3s3.77 0 4.78.354a6.3 6.3 0 0 1 3.866 3.865C21 8.23 21 9.486 21 12s0 3.77-.354 4.78a6.3 6.3 0 0 1-3.865 3.866C15.77 21 14.514 21 12 21s-3.77 0-4.78-.354a6.3 6.3 0 0 1-3.866-3.865C3 15.77 3 14.514 3 12Zm12.778-.56a3.819 3.819 0 1 1-7.555 1.12 3.819 3.819 0 0 1 7.554-1.12Z" />
    </svg>
  ),
  'Email': (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.803 7.762-5.508 3.505c-1.557.99-2.335 1.486-3.171 1.678a5 5 0 0 1-2.248 0c-.836-.192-1.614-.688-3.171-1.678L2.197 7.762m19.606 0C22 8.722 22 10.006 22 12c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185C18.2 20 16.8 20 14 20h-4c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C2 16.2 2 14.8 2 12c0-1.994 0-3.278.197-4.238m19.606 0a4 4 0 0 0-.348-1.032 5 5 0 0 0-2.185-2.185C18.2 4 16.8 4 14 4h-4c-2.8 0-4.2 0-5.27.545A5 5 0 0 0 2.545 6.73a4 4 0 0 0-.348 1.032" />
    </svg>
  ),
};

function MobileDraggableItem({ item, collageWidth, collageHeight }) {
  const px = (item.x / 100) * collageWidth;
  const py = (item.y / 100) * collageHeight;
  const pw = (item.w / 100) * collageWidth;

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

const BIO_SHORT = "Hello I'm Piyush Jain, brand & product designer, builder, and someone who loves making things pretty. Mostly working around AI and new ideas these days.";
const BIO_LONG = "I'm 22, and I've been designing for about five years. Most of that time has gone into building products across Web2, Web3, and e-commerce. These days I'm deep in AI, building small internal tools for myself and trying to get genuinely good at it.\n\nI was never the studious kid, but I've always been curious about design and how things work. Making things pretty is something I've loved for as long as I can remember.\n\nOutside of work, I travel when I can, watch a lot of movies, and keep good music on most of the day. I'm into watches, tech products, and I'll happily spend an hour critiquing a design that didn't need to be that bad.";

export default function MobileAbout() {
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
  const collageHeight = Math.round(containerWidth * 0.85); // tighter — pulls text closer to collage
  const [emailCopied, setEmailCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const fontSize = Math.min(containerWidth * 0.04, 16);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 12,
      paddingBottom: 120, // leave room for the pinned socials + footer
    }}>
      {/* Sticker collage */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: collageHeight,
        overflow: 'visible',
      }}>
        {MOBILE_ITEMS.map(item => (
          <MobileDraggableItem
            key={item.id}
            item={item}
            collageWidth={containerWidth}
            collageHeight={collageHeight}
          />
        ))}
      </div>

      {/* Bio text + More toggle */}
      <div style={{
        padding: '20px 28px 0',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize,
          fontWeight: 400,
          color: 'var(--figma-text)',
          lineHeight: 1.5,
          fontFamily: "'Figtree', sans-serif",
          letterSpacing: '-0.03em',
          whiteSpace: 'pre-line',
        }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={expanded ? 'long' : 'short'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block' }}
            >
              {expanded ? BIO_LONG : BIO_SHORT}
              {' '}
              <span
                onClick={() => setExpanded(v => !v)}
                style={{
                  color: '#0d99ff',
                  cursor: 'pointer',
                  fontWeight: 500,
                  textDecoration: 'underline',
                }}
              >
                {expanded ? 'tldr' : 'More'}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed socials + footer pinned to bottom of viewport */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 16,
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        background: 'linear-gradient(to bottom, transparent 0, var(--figma-bg) 30%)',
        zIndex: 50,
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          pointerEvents: 'auto',
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
              {socialIcons[link.label]?.(20)}
            </div>
          ))}
        </div>

        <div style={{
          fontSize: 11,
          color: 'var(--figma-text-tertiary)',
          paddingTop: 12,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          pointerEvents: 'auto',
        }}>
          Made with ❤️ by Piyush Jain and Claude
        </div>
      </div>

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
          animation: 'fadeInUp 0.2s ease',
        }}>
          Email copied ✓
        </div>
      )}
    </div>
  );
}
