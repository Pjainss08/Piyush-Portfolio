import React, { useState, useRef } from 'react';

const PLAYGROUND_IMAGES = [
  '/brunette.webp',
  '/gdupi.webp',
  '/higher.webp',
  '/3.webp',
  '/ama-1.webp',
  '/ama-2.webp',
  '/ama-3.webp',
  '/background+border.webp',
  '/card-sample-1.webp',
  '/card-sample-2.webp',
  '/card-sample.webp',
  '/card.webp',
  '/desktop---29.webp',
  '/desktop---31.webp',
  '/desktop---39.webp',
  '/farcaster-friday-poap.webp',
  '/fbi-3.webp',
  '/frame-1116606461.webp',
  '/frame-13.webp',
  '/frame-2147223436.webp',
  '/frame-2147223657.webp',
  '/frame-2147224020.webp',
  '/frame-2147224022.webp',
  '/frame-2147224023.webp',
  '/frame-2147224025.webp',
  '/frame-2147224026-1.webp',
  '/frame-2147224026.webp',
  '/frame-2147224029.webp',
  '/frame-2147224032.webp',
  '/frame-2147224034.webp',
  '/frame-2147224036.webp',
  '/frame-2147224037.webp',
  '/frame-2147224038.webp',
  '/frame-2147224040.webp',
  '/frame-2147224041.webp',
  '/frame-2147224047.webp',
  '/frame-2147224283.webp',
  '/image-1.webp',
  '/image-1566.webp',
  '/image-1715.webp',
  '/image-1717.webp',
  '/image-1719.webp',
  '/image-1720.webp',
  '/image-2.webp',
  '/image.webp',
  '/logo-01.webp',
  '/poap-7.webp',
  '/success.webp',
];

// Seeded pseudo-random number generator for deterministic but chaotic placement
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generatePositions(count) {
  const positions = [];
  const rand = seededRandom(42);

  // Spread across left side only (avoid Builds at x:2200+)
  const areaWidth = 1800;
  const areaHeight = 1800;
  const startY = 2100;

  // Place images with collision avoidance
  const placed = [];

  for (let i = 0; i < count; i++) {
    let bestX, bestY, bestDist = 0;

    // Try multiple random positions, pick the one with best spacing
    for (let attempt = 0; attempt < 20; attempt++) {
      const tryX = rand() * areaWidth;
      const tryY = startY + rand() * areaHeight;

      // Find minimum distance to already placed items
      let minDist = Infinity;
      for (const p of placed) {
        const dx = tryX - p.x;
        const dy = tryY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        minDist = Math.min(minDist, dist);
      }

      if (placed.length === 0 || minDist > bestDist) {
        bestDist = minDist;
        bestX = tryX;
        bestY = tryY;
      }
    }

    const width = 180 + rand() * 120;
    const rotate = (rand() - 0.5) * 16; // -8 to +8 degrees

    placed.push({ x: bestX, y: bestY });
    positions.push({
      x: bestX,
      y: bestY,
      width,
      rotate,
      zIndex: Math.floor(rand() * 10),
    });
  }
  return positions;
}

const POSITIONS = generatePositions(PLAYGROUND_IMAGES.length);

function DraggableImage({ src, x, y, w, rotate, zIndex, transform }) {
  const [pos, setPos] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const [lifted, setLifted] = useState(false);
  const dragStart = useRef(null);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setLifted(true);
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
      setTimeout(() => { setDragging(false); setLifted(false); }, 0);
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
        transform: `rotate(${rotate}deg)${lifted ? ' scale(1.05)' : ''}`,
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        filter: lifted
          ? 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))'
          : 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))',
        zIndex: lifted ? 999 : zIndex,
        transition: dragging ? 'none' : 'transform 0.2s, filter 0.2s',
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
      width: 3000,
      height: 5000,
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
          zIndex={POSITIONS[i].zIndex}
          transform={transform}
        />
      ))}
    </div>
  );
}
