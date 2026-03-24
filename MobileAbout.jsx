import React, { useState, useRef, useEffect } from 'react';

const MOBILE_ITEMS = [
  { id: 'notebook', src: '/notebook.png', x: 0, y: 60, width: 160, rotate: -3, zIndex: 0 },
  { id: 'srk', src: '/sticker-srk.png', x: 110, y: 0, width: 90, rotate: -5, zIndex: 2, sticker: true },
  { id: 'polaroid-me', src: '/polaroid-me.png', x: 130, y: 50, width: 160, rotate: -6, zIndex: 3 },
  { id: 'vinyl', src: '/vinyl-record.png', x: 250, y: 10, width: 80, rotate: 8, zIndex: 4 },
  { id: 'polaroid-mt', src: '/polaroid-mountain.png', x: 270, y: 40, width: 150, rotate: 4, zIndex: 3 },
  { id: 'blob', src: '/sticker-blob.png', x: 420, y: 0, width: 50, rotate: 6, zIndex: 5, sticker: true },
  { id: 'book', src: '/book-show-your-work.png', x: 420, y: 30, width: 140, rotate: 5, zIndex: 2 },
  { id: 'spiderman', src: '/sticker-spiderman.png', x: 140, y: 280, width: 100, rotate: -2, zIndex: 5, sticker: true },
  { id: 'king', src: '/sticker-king.png', x: 400, y: 130, width: 100, rotate: -2, zIndex: 4, sticker: true },
  { id: 'pantone', src: '/pantone.png', x: 470, y: 260, width: 80, rotate: -4, zIndex: 5, sticker: true },
];

function MobileDraggableItem({ item, scale }) {
  const [pos, setPos] = useState({ x: item.x * scale, y: item.y * scale });
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

  const imgStyle = {
    width: w,
    borderRadius: item.sticker ? 0 : 4,
    filter: item.sticker
      ? 'drop-shadow(1px 2px 4px rgba(0,0,0,0.1))'
      : 'drop-shadow(2px 3px 8px rgba(0,0,0,0.1))',
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
          <img src={item.src} alt="" draggable={false} style={{ ...imgStyle, borderRadius: 6 }} />
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
        ...imgStyle,
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
  const containerRef = useRef(null);

  useEffect(() => {
    const w = window.innerWidth;
    // Scale items to fit mobile width (desktop was ~600px wide content)
    setScale(Math.min(w / 600, 1));
  }, []);

  return (
    <div style={{ padding: '24px 16px', minHeight: '100%' }}>
      {/* Sticker collage area */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 420 * scale,
          marginBottom: 24,
        }}
      >
        {MOBILE_ITEMS.map(item => (
          <MobileDraggableItem key={item.id} item={item} scale={scale} />
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
        maxWidth: 340,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        hello, i'm piyush jain a designer who loves to build & explore new things. currently exploring ai and products.
      </div>
    </div>
  );
}
