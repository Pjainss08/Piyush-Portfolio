import React, { useRef, memo, useState } from 'react';

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
  const areaWidth = 1800;
  const areaHeight = 1800;
  const startY = 2100;
  const placed = [];

  for (let i = 0; i < count; i++) {
    let bestX, bestY, bestDist = 0;

    for (let attempt = 0; attempt < 20; attempt++) {
      const tryX = rand() * areaWidth;
      const tryY = startY + rand() * areaHeight;

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
    const rotate = (rand() - 0.5) * 16;

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

const DraggableImage = memo(function DraggableImage({ src, x, y, w, rotate, zIndex, transformRef }) {
  const elRef = useRef(null);
  const [lifted, setLifted] = useState(false);
  const posRef = useRef({ x, y });

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setLifted(true);

    const startMouse = { x: e.clientX, y: e.clientY };
    const startItem = { ...posRef.current };
    const scale = transformRef.current.scale;

    const onMove = (ev) => {
      const dx = (ev.clientX - startMouse.x) / scale;
      const dy = (ev.clientY - startMouse.y) / scale;
      const nx = startItem.x + dx;
      const ny = startItem.y + dy;
      posRef.current = { x: nx, y: ny };
      if (elRef.current) {
        elRef.current.style.left = nx + 'px';
        elRef.current.style.top = ny + 'px';
      }
    };

    const onUp = () => {
      setLifted(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <img
      data-card
      ref={elRef}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: posRef.current.x,
        top: posRef.current.y,
        width: w,
        borderRadius: 8,
        transform: `rotate(${rotate}deg)${lifted ? ' scale(1.05)' : ''} translateZ(0)`,
        cursor: 'grab',
        userSelect: 'none',
        filter: lifted
          ? 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))'
          : 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))',
        zIndex: lifted ? 999 : zIndex,
        transition: lifted ? 'transform 0.2s, filter 0.2s' : 'transform 0.2s, filter 0.2s',
        willChange: 'left, top, transform',
      }}
    />
  );
});

function PlaygroundSection({ transformRef }) {
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
          transformRef={transformRef}
        />
      ))}
    </div>
  );
}

export default memo(PlaygroundSection);
