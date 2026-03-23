import React, { useState, useRef } from 'react';

// Mosaic layout — images arranged around "Design Playground" center text
// No overlapping, clean gaps, spread horizontally
const PLAYGROUND_ITEMS = [
  // Row 1 (top)
  { src: '/frame-2147224024.png', x: 0, y: 0, w: 180 },
  { src: '/frame-2147224026-1.png', x: 200, y: 0, w: 180 },
  { src: '/frame-2147224026.png', x: 400, y: 0, w: 180 },
  { src: '/frame-2147224029.png', x: 600, y: 0, w: 260 },
  { src: '/frame-2147224030.png', x: 880, y: 0, w: 220 },
  { src: '/frame-2147224034.png', x: 1120, y: 0, w: 200 },
  { src: '/frame-2147224037.png', x: 1340, y: 0, w: 260 },

  // Row 2 (middle-left, leaving center gap)
  { src: '/frame-2147224030-1.png', x: 0, y: 300, w: 220 },
  { src: '/frame-2147224031.png', x: 240, y: 280, w: 200 },
  { src: '/frame-2147224031-1.png', x: 0, y: 520, w: 180 },

  // Row 2 (middle-right)
  { src: '/frame-2147224038.png', x: 1060, y: 280, w: 220 },
  { src: '/frame-2147224040.png', x: 1300, y: 300, w: 200 },
  { src: '/frame-2147224032.png', x: 1100, y: 520, w: 200 },

  // Row 3 (bottom)
  { src: '/frame-2147224032-1.png', x: 0, y: 720, w: 220 },
  { src: '/frame-2147224036.png', x: 240, y: 700, w: 200 },
  { src: '/frame-2147224045.png', x: 460, y: 720, w: 200 },
  { src: '/frame-2147224046.png', x: 680, y: 700, w: 200 },
  { src: '/frame-2147224047.png', x: 900, y: 720, w: 220 },
  { src: '/frame-2147224048.png', x: 1140, y: 700, w: 200 },
  { src: '/frame-2147224283.png', x: 1360, y: 720, w: 240 },
];

function DraggableImage({ src, x, y, w, transform }) {
  const [pos, setPos] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      itemX: pos.x,
      itemY: pos.y,
    };

    const handleMouseMove = (e) => {
      if (!dragStart.current) return;
      const dx = (e.clientX - dragStart.current.mouseX) / transform.scale;
      const dy = (e.clientY - dragStart.current.mouseY) / transform.scale;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setDragging(true);
      setPos({
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
  };

  return (
    <img
      data-card
      src={src}
      alt=""
      draggable={false}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: w,
        borderRadius: 0,
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: dragging ? 'none' : 'box-shadow 0.2s',
      }}
    />
  );
}

export default function PlaygroundSection({ transform }) {
  const startX = 100;
  const startY = 1680;

  return (
    <div style={{
      position: 'absolute',
      left: startX,
      top: startY,
      width: 1620,
      height: 1000,
    }}>
      {/* Center text */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '46%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <div style={{
          fontSize: 42,
          fontWeight: 700,
          color: 'var(--figma-text)',
          fontFamily: "'Figtree', sans-serif",
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          Design
        </div>
        <div style={{
          fontSize: 42,
          fontWeight: 700,
          color: 'var(--figma-text)',
          fontFamily: "'Figtree', sans-serif",
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          Playground
        </div>
      </div>

      {/* Images */}
      {PLAYGROUND_ITEMS.map((item, i) => (
        <DraggableImage
          key={i}
          src={item.src}
          x={item.x}
          y={item.y}
          w={item.w}
          transform={transform}
        />
      ))}
    </div>
  );
}
