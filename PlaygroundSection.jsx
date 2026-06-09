import React, { useRef, memo, useState } from 'react';
import PLAYGROUND_IMAGES, { isVideo } from './playgroundImages.js';

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shuffled(arr, seed) {
  const rand = seededRandom(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SHUFFLED_IMAGES = shuffled(PLAYGROUND_IMAGES, 137);

// Grid + jitter: each item gets a cell, with small random offset for organic feel
function generatePositions(count) {
  const positions = [];
  const rand = seededRandom(42);
  const cols = 7;
  const cellW = 320;
  const cellH = 320;
  const startX = 0;
  const startY = 2100;
  const itemBase = 260;     // average item width
  const sizeVariance = 50;  // ± half of this
  const jitter = 22;        // ± per axis offset within cell

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const width = itemBase + (rand() - 0.5) * sizeVariance;
    const cellOffsetX = (cellW - width) / 2;
    const cellOffsetY = (cellH - width) / 2;
    const x = startX + col * cellW + cellOffsetX + (rand() - 0.5) * jitter * 2;
    const y = startY + row * cellH + cellOffsetY + (rand() - 0.5) * jitter * 2;
    positions.push({ x, y, width, rotate: 0, zIndex: i });
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

  const commonStyle = {
    position: 'absolute',
    left: posRef.current.x,
    top: posRef.current.y,
    width: w,
    transform: `rotate(${rotate}deg)${lifted ? ' scale(1.05)' : ''} translateZ(0)`,
    cursor: 'grab',
    userSelect: 'none',
    filter: lifted
      ? 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))'
      : 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))',
    zIndex: lifted ? 999 : zIndex,
    transition: 'transform 0.2s, filter 0.2s',
    willChange: 'left, top, transform',
    display: 'block',
  };

  if (isVideo(src)) {
    return (
      <video
        data-card
        ref={elRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onMouseDown={handleMouseDown}
        style={commonStyle}
      />
    );
  }

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
      style={commonStyle}
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
      height: 5500,
      pointerEvents: 'auto',
    }}>
      {SHUFFLED_IMAGES.map((src, i) => (
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
