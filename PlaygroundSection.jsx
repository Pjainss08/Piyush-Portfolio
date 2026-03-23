import React, { useState, useRef } from 'react';

const PLAYGROUND_IMAGES = [
  '/frame-2147224024.png',
  '/frame-2147224026-1.png',
  '/frame-2147224026.png',
  '/frame-2147224029.png',
  '/frame-2147224030-1.png',
  '/frame-2147224030.png',
  '/frame-2147224031-1.png',
  '/frame-2147224031.png',
  '/frame-2147224032-1.png',
  '/frame-2147224032.png',
  '/frame-2147224034.png',
  '/frame-2147224036.png',
  '/frame-2147224037.png',
  '/frame-2147224038.png',
  '/frame-2147224040.png',
  '/frame-2147224045.png',
  '/frame-2147224046.png',
  '/frame-2147224047.png',
  '/frame-2147224048.png',
  '/frame-2147224283.png',
];

// Deterministic random scatter positions — spread wide, varied sizes and rotations
function generatePositions(count) {
  const positions = [];
  const cols = 5;
  const colWidth = 340;
  const rowHeight = 320;

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    // Add some pseudo-random offset based on index
    const seed = (i * 137 + 73) % 100;
    const offsetX = (seed % 60) - 30;
    const offsetY = ((seed * 3) % 80) - 40;
    const rotate = ((seed % 11) - 5) * 1.5;
    const width = 200 + (seed % 80);

    positions.push({
      x: col * colWidth + offsetX + 50,
      y: 2200 + row * rowHeight + offsetY,
      width,
      rotate,
    });
  }
  return positions;
}

const POSITIONS = generatePositions(PLAYGROUND_IMAGES.length);

function DraggableImage({ src, x, y, w, rotate, transform }) {
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
        borderRadius: 8,
        transform: `rotate(${rotate}deg)`,
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    />
  );
}

export default function PlaygroundSection({ transform }) {
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: 2000,
      height: 3000,
      pointerEvents: 'auto',
    }}>
      {PLAYGROUND_IMAGES.map((src, i) => (
        <DraggableImage
          key={i}
          src={src}
          x={POSITIONS[i].x}
          y={POSITIONS[i].y}
          w={POSITIONS[i].width}
          rotate={POSITIONS[i].rotate}
          transform={transform}
        />
      ))}
    </div>
  );
}
