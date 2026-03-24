import React, { useState, useRef, useCallback } from 'react';

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

function DraggableItem({ item, onUpdate, transform }) {
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const handleMouseDown = useCallback((e) => {
    if (item.draggable === false) return;
    e.stopPropagation();
    e.preventDefault();
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      itemX: item.x,
      itemY: item.y,
    };

    const handleMouseMove = (e) => {
      if (!dragStart.current) return;
      const dx = (e.clientX - dragStart.current.mouseX) / transform.scale;
      const dy = (e.clientY - dragStart.current.mouseY) / transform.scale;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setDragging(true);
      onUpdate(item.id, {
        x: dragStart.current.itemX + dx,
        y: dragStart.current.itemY + dy,
      });
    };

    const handleMouseUp = () => {
      dragStart.current = null;
      setTimeout(() => setDragging(false), 0);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [item, onUpdate, transform.scale]);

  const isDraggable = item.draggable !== false;

  if (item.sticker) {
    return (
      <div
        data-card
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          left: item.x,
          top: item.y,
          width: item.width,
          transform: `rotate(${item.rotate}deg)`,
          filter: 'drop-shadow(4px 6px 14px rgba(0,0,0,0.16))',
          pointerEvents: isDraggable ? 'auto' : 'none',
          cursor: isDraggable ? (dragging ? 'grabbing' : 'grab') : 'default',
          zIndex: item.zIndex,
          userSelect: 'none',
          transition: dragging ? 'none' : 'filter 0.2s',
          background: '#fff',
          borderRadius: 12,
          padding: 4,
          border: '1px solid #eee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <img src={item.src} alt="" draggable={false} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
      </div>
    );
  }

  return (
    <img
      data-card
      src={item.src}
      alt=""
      draggable={false}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: item.width,
        transform: `rotate(${item.rotate}deg)`,
        filter: 'drop-shadow(4px 6px 14px rgba(0,0,0,0.16))',
        pointerEvents: isDraggable ? 'auto' : 'none',
        cursor: isDraggable ? (dragging ? 'grabbing' : 'grab') : 'default',
        zIndex: item.zIndex,
        userSelect: 'none',
        transition: dragging ? 'none' : 'filter 0.2s',
      }}
    />
  );
}

export default function AboutSection({ transform }) {
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
          transform={transform}
        />
      ))}

      {/* Bio text — not draggable */}
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
        hello, i'm piyush jain a designer who loves to build & explore new things. currently exploring ai and products.
      </div>
    </div>
  );
}
