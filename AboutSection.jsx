import React, { useState, useRef, useCallback, memo } from 'react';

const INITIAL_ITEMS = [
  { id: 'notebook', src: '/notebook.webp', x: -40, y: 80, width: 320, rotate: -3, zIndex: 0 },
  { id: 'srk', src: '/sticker-srk.webp', x: 220, y: -20, width: 170, rotate: -5, zIndex: 3 },
  { id: 'polaroid-me', src: '/polaroid-me.webp', x: 320, y: 60, width: 300, rotate: -6, zIndex: 2 },
  { id: 'vinyl', src: '/vinyl-record.webp', x: 490, y: -30, width: 140, rotate: 8, zIndex: 5 },
  { id: 'polaroid-mountain', src: '/polaroid-mountain.webp', x: 560, y: 40, width: 300, rotate: 4, zIndex: 1 },
  { id: 'blob', src: '/sticker-blob.webp', x: 820, y: -20, width: 90, rotate: 6, zIndex: 3 },
  { id: 'book', src: '/book-show-your-work.webp', x: 950, y: 30, width: 280, rotate: 5, zIndex: 1 },
  { id: 'spiderman', src: '/sticker-spiderman.webp', x: 280, y: 400, width: 180, rotate: -2, zIndex: 1 },
  { id: 'king', src: '/sticker-king.webp', x: 800, y: 180, width: 180, rotate: -2, zIndex: 2 },
  { id: 'pantone', src: '/pantone.webp', x: 980, y: 380, width: 140, rotate: -4, zIndex: 1, sticker: true },
];

const DraggableItem = memo(function DraggableItem({ item, onUpdate, transformRef }) {
  const elRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    if (item.draggable === false) return;
    e.stopPropagation();
    e.preventDefault();

    const startMouse = { x: e.clientX, y: e.clientY };
    const startItem = { x: item.x, y: item.y };
    const scale = transformRef.current.scale;
    let lastX = item.x;
    let lastY = item.y;
    let moved = false;

    const onMove = (ev) => {
      const dx = (ev.clientX - startMouse.x) / scale;
      const dy = (ev.clientY - startMouse.y) / scale;
      if (!moved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) moved = true;
      lastX = startItem.x + dx;
      lastY = startItem.y + dy;
      if (elRef.current) {
        elRef.current.style.left = lastX + 'px';
        elRef.current.style.top = lastY + 'px';
      }
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (moved) onUpdate(item.id, { x: lastX, y: lastY });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [item, onUpdate, transformRef]);

  const isDraggable = item.draggable !== false;

  if (item.sticker) {
    return (
      <div
        data-card
        ref={elRef}
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          left: item.x,
          top: item.y,
          width: item.width,
          transform: `rotate(${item.rotate}deg) translateZ(0)`,
          filter: 'drop-shadow(4px 6px 14px rgba(0,0,0,0.16))',
          pointerEvents: isDraggable ? 'auto' : 'none',
          cursor: isDraggable ? 'grab' : 'default',
          zIndex: item.zIndex,
          userSelect: 'none',
          background: '#fff',
          borderRadius: 12,
          padding: 4,
          border: '1px solid #eee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          willChange: 'left, top',
        }}
      >
        <img src={item.src} alt="" draggable={false} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
      </div>
    );
  }

  return (
    <img
      data-card
      ref={elRef}
      src={item.src}
      alt=""
      draggable={false}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: item.width,
        transform: `rotate(${item.rotate}deg) translateZ(0)`,
        filter: 'drop-shadow(4px 6px 14px rgba(0,0,0,0.16))',
        pointerEvents: isDraggable ? 'auto' : 'none',
        cursor: isDraggable ? 'grab' : 'default',
        zIndex: item.zIndex,
        userSelect: 'none',
        willChange: 'left, top',
      }}
    />
  );
});

function AboutSection({ transformRef }) {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const updateItem = useCallback((id, updates) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, []);

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1300,
      height: 900,
      pointerEvents: 'none',
    }}>
      {items.map(item => (
        <DraggableItem
          key={item.id}
          item={item}
          onUpdate={updateItem}
          transformRef={transformRef}
        />
      ))}

      <div style={{
        position: 'absolute',
        left: 460,
        top: 440,
        width: 380,
        fontSize: 24,
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 400,
        color: 'var(--figma-text)',
        lineHeight: 1.5,
        letterSpacing: '-0.02em',
        pointerEvents: 'none',
      }}>
        Hello I'm Piyush Jain, brand & product designer, builder, and someone who loves making things pretty. Mostly working around AI and new ideas these days
      </div>

      {/* Callout: explore the sections (top-left, arrow points left toward sidebar) */}
      <div style={{
        position: 'absolute',
        left: 60,
        top: -110,
        fontFamily: "'Caveat', cursive",
        fontSize: 28,
        fontWeight: 500,
        color: 'var(--figma-text-tertiary)',
        lineHeight: 1.15,
        pointerEvents: 'none',
        transform: 'rotate(-3deg)',
        whiteSpace: 'nowrap',
      }}>
        explore the<br />sections from here
        <svg
          width="80" height="60"
          viewBox="0 0 80 60"
          style={{ position: 'absolute', top: 58, left: -55, overflow: 'visible' }}
        >
          <path
            d="M 75 5 Q 50 25 5 55"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 5 55 L 18 53 M 5 55 L 12 44"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Callout: follow me (top-right, arrow points up-right toward profile/social) */}
      <div style={{
        position: 'absolute',
        left: 1080,
        top: -110,
        fontFamily: "'Caveat', cursive",
        fontSize: 28,
        fontWeight: 500,
        color: 'var(--figma-text-tertiary)',
        lineHeight: 1.15,
        pointerEvents: 'none',
        transform: 'rotate(2deg)',
        whiteSpace: 'nowrap',
      }}>
        make sure to<br />follow me ;)
        <svg
          width="80" height="60"
          viewBox="0 0 80 60"
          style={{ position: 'absolute', top: 35, left: 130, overflow: 'visible' }}
        >
          <path
            d="M 5 55 Q 30 30 75 5"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 75 5 L 67 15 M 75 5 L 62 7"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Callout: not figma (below bio text) */}
      <div style={{
        position: 'absolute',
        left: 460,
        top: 638,
        width: 460,
        fontFamily: "'Caveat', cursive",
        fontSize: 26,
        fontWeight: 500,
        color: 'var(--figma-text-tertiary)',
        lineHeight: 1.2,
        pointerEvents: 'none',
        transform: 'rotate(-1deg)',
      }}>
        yep, this is not figma feel free to<br />explore however you like :)
      </div>
    </div>
  );
}

export default memo(AboutSection);
