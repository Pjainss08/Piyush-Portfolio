import React from 'react';
import useTouchCanvas from './useTouchCanvas.js';

// Import same data from PlaygroundSection
const PLAYGROUND_IMAGES = [
  '/brunette.png', '/gdupi.png', '/higher.png', '/3.png',
  '/ama-1.png', '/ama-2.png', '/ama-3.png', '/background+border.png',
  '/card-sample-1.png', '/card-sample-2.png', '/card-sample.png', '/card.png',
  '/desktop---29.png', '/desktop---31.png', '/desktop---39.png',
  '/farcaster-friday-poap.png', '/fbi-3.png',
  '/frame-1116606461.png', '/frame-13.png', '/frame-2147223436.png',
  '/frame-2147223657.png', '/frame-2147224020.png', '/frame-2147224022.png',
  '/frame-2147224023.png', '/frame-2147224025.png', '/frame-2147224026-1.png',
  '/frame-2147224026.png', '/frame-2147224029.png', '/frame-2147224032.png',
  '/frame-2147224034.png', '/frame-2147224036.png', '/frame-2147224037.png',
  '/frame-2147224038.png', '/frame-2147224040.png', '/frame-2147224041.png',
  '/frame-2147224047.png', '/frame-2147224283.png',
  '/image-1.png', '/image-1566.png', '/image-1715.png', '/image-1717.png',
  '/image-1719.png', '/image-1720.png', '/image-2.png', '/image.png',
  '/logo-01.png', '/poap-7.png', '/success.png',
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
    const width = 180 + rand() * 120;
    const rotate = (rand() - 0.5) * 16;
    placed.push({ x: bestX, y: bestY });
    positions.push({ x: bestX, y: bestY, width, rotate, zIndex: Math.floor(rand() * 10) });
  }
  return positions;
}

const POSITIONS = generatePositions(PLAYGROUND_IMAGES.length);

export default function MobilePlayground() {
  const { transform, containerRef, handlers } = useTouchCanvas({ x: -200, y: -200, scale: 0.3 });

  return (
    <div
      ref={containerRef}
      {...handlers}
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
        width: 1,
        height: 1,
        overflow: 'visible',
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
