import React, { useState, useRef } from 'react';

// All positions fit within 0-100% of container width, nothing extends outside
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
  { id: 'pantone', src: '/pantone.png', x: 65, y: 52, w: 18, rotate: -4, zIndex: 5, sticker: true },
];

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
          padding: 3, background: '#fff', borderRadius: 8,
          border: '1px solid #eee',
          boxShadow: '1px 2px 6px rgba(0,0,0,0.08)',
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

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Sticker collage area */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: containerWidth * 0.95,
        overflow: 'visible',
      }}>
        {MOBILE_ITEMS.map(item => (
          <MobileDraggableItem key={item.id} item={item} containerWidth={containerWidth} />
        ))}
      </div>

      {/* Bio text — below stickers, no overlap */}
      <div style={{
        fontSize: Math.min(containerWidth * 0.046, 18),
        fontWeight: 400,
        color: 'var(--figma-text)',
        lineHeight: 1.6,
        fontFamily: "'Figtree', sans-serif",
        letterSpacing: '-0.03em',
        padding: '16px 32px 32px',
        textAlign: 'center',
      }}>
        hello, i'm piyush jain a designer who loves to build & explore new things. currently exploring ai and products.
      </div>
    </div>
  );
}
