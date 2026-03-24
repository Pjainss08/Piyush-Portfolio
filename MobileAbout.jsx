import React, { useState, useRef, useEffect } from 'react';

// Positions tuned for ~375px mobile width, centered collage
const MOBILE_ITEMS = [
  { id: 'notebook', src: '/notebook.png', x: -20, y: 80, width: 180, rotate: -3, zIndex: 0 },
  { id: 'srk', src: '/sticker-srk.png', x: 120, y: 10, width: 100, rotate: -5, zIndex: 2 },
  { id: 'polaroid-me', src: '/polaroid-me.png', x: 160, y: 70, width: 180, rotate: -6, zIndex: 3 },
  { id: 'vinyl', src: '/vinyl-record.png', x: 310, y: 20, width: 90, rotate: 8, zIndex: 4 },
  { id: 'polaroid-mt', src: '/polaroid-mountain.png', x: 300, y: 80, width: 160, rotate: 4, zIndex: 3 },
  { id: 'blob', src: '/sticker-blob.png', x: 440, y: 10, width: 55, rotate: 6, zIndex: 5 },
  { id: 'book', src: '/book-show-your-work.png', x: 420, y: 50, width: 160, rotate: 5, zIndex: 2 },
  { id: 'spiderman', src: '/sticker-spiderman.png', x: 30, y: 300, width: 100, rotate: -2, zIndex: 1 },
  { id: 'king', src: '/sticker-king.png', x: 420, y: 180, width: 110, rotate: -2, zIndex: 4 },
  { id: 'pantone', src: '/pantone.png', x: 440, y: 340, width: 90, rotate: -4, zIndex: 5, sticker: true },
];

function MobileDraggableItem({ item, scale, offsetX }) {
  const [pos, setPos] = useState({ x: item.x * scale + offsetX, y: item.y * scale });
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

  const w = item.width * scale;

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
          <img src={item.src} alt="" draggable={false} style={{ width: w, borderRadius: 6 }} />
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
        width: w, borderRadius: 4,
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
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    const w = window.innerWidth;
    // Content designed for ~580px width, scale to fit with padding
    const s = Math.min((w - 32) / 580, 1);
    setScale(s);
    // Center the collage horizontally
    const contentWidth = 580 * s;
    setOffsetX((w - contentWidth) / 2);
  }, []);

  return (
    <div style={{ padding: '16px 0', minHeight: '100%' }}>
      {/* Sticker collage area */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 480 * scale,
        marginBottom: 16,
      }}>
        {MOBILE_ITEMS.map(item => (
          <MobileDraggableItem key={item.id} item={item} scale={scale} offsetX={offsetX} />
        ))}
      </div>

      {/* Bio text */}
      <div style={{
        fontSize: 18,
        fontWeight: 400,
        color: 'var(--figma-text)',
        lineHeight: 1.6,
        fontFamily: "'Figtree', sans-serif",
        letterSpacing: '-0.03em',
        padding: '0 32px',
        textAlign: 'center',
      }}>
        hello, i'm piyush jain a designer who loves to build & explore new things. currently exploring ai and products.
      </div>
    </div>
  );
}
