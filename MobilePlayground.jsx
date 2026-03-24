import React from 'react';
import useTouchCanvas from './useTouchCanvas.js';

// Import same data from PlaygroundSection
const PLAYGROUND_IMAGES = [
  '/brunette.webp', '/gdupi.webp', '/higher.webp', '/3.webp',
  '/ama-1.webp', '/ama-2.webp', '/ama-3.webp', '/background+border.webp',
  '/card-sample-1.webp', '/card-sample-2.webp', '/card-sample.webp', '/card.webp',
  '/desktop---29.webp', '/desktop---31.webp', '/desktop---39.webp',
  '/farcaster-friday-poap.webp', '/fbi-3.webp',
  '/frame-1116606461.webp', '/frame-13.webp', '/frame-2147223436.webp',
  '/frame-2147223657.webp', '/frame-2147224020.webp', '/frame-2147224022.webp',
  '/frame-2147224023.webp', '/frame-2147224025.webp', '/frame-2147224026-1.webp',
  '/frame-2147224026.webp', '/frame-2147224029.webp', '/frame-2147224032.webp',
  '/frame-2147224034.webp', '/frame-2147224036.webp', '/frame-2147224037.webp',
  '/frame-2147224038.webp', '/frame-2147224040.webp', '/frame-2147224041.webp',
  '/frame-2147224047.webp', '/frame-2147224283.webp',
  '/image-1.webp', '/image-1566.webp', '/image-1715.webp', '/image-1717.webp',
  '/image-1719.webp', '/image-1720.webp', '/image-2.webp', '/image.webp',
  '/logo-01.webp', '/poap-7.webp', '/success.webp',
];

// Same seeded random from PlaygroundSection
function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function generatePositions(count) {
  const positions = [];
  const rand = seededRandom(42);
  const areaWidth = 1800;
  const areaHeight = 1800;
  const placed = [];

  for (let i = 0; i < count; i++) {
    let bestX, bestY, bestDist = 0;
    for (let attempt = 0; attempt < 20; attempt++) {
      const tryX = rand() * areaWidth;
      const tryY = rand() * areaHeight;
      let minDist = Infinity;
      for (const p of placed) {
        const dx = tryX - p.x;
        const dy = tryY - p.y;
        minDist = Math.min(minDist, Math.sqrt(dx * dx + dy * dy));
      }
      if (placed.length === 0 || minDist > bestDist) {
        bestDist = minDist; bestX = tryX; bestY = tryY;
      }
    }
    const width = 150 + rand() * 100;
    const rotate = (rand() - 0.5) * 16;
    placed.push({ x: bestX, y: bestY });
    positions.push({ x: bestX, y: bestY, width, rotate, zIndex: Math.floor(rand() * 10) });
  }
  return positions;
}

const POSITIONS = generatePositions(PLAYGROUND_IMAGES.length);

export default function MobilePlayground() {
  // Center content: area is 1800x1800, mobile viewport ~375x700
  // At scale 0.25: 1800*0.25=450px wide, need x offset to center: (375-450)/2 = -37
  const { transform, containerRef } = useTouchCanvas({ x: -37, y: 20, scale: 0.25 });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        touchAction: 'none',
        background: 'var(--figma-canvas, #f5f5f5)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transformOrigin: '0 0',
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        willChange: 'transform',
        width: 2000,
        height: 2000,
        contain: 'layout style paint',
      }}>
        {PLAYGROUND_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            loading="lazy"
            style={{
              position: 'absolute',
              left: POSITIONS[i].x,
              top: POSITIONS[i].y,
              width: POSITIONS[i].width,
              borderRadius: 8,
              transform: `rotate(${POSITIONS[i].rotate}deg)`,
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: POSITIONS[i].zIndex,
            }}
          />
        ))}
      </div>
    </div>
  );
}
