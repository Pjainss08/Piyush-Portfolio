import React, { useRef, memo, useState, useEffect } from 'react';
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
  const video = isVideo(src);

  useEffect(() => {
    if (!video || !elRef.current) return undefined;

    const element = elRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;

    const syncPlayback = () => {
      if (visible && !reduceMotion.matches) element.play().catch(() => {});
      else element.pause();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, {
      root: element.closest('.canvas-viewport'),
      rootMargin: '240px',
    });

    observer.observe(element);
    reduceMotion.addEventListener('change', syncPlayback);

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener('change', syncPlayback);
      element.pause();
    };
  }, [video]);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setLifted(true);

    const startMouse = { x: e.clientX, y: e.clientY };
    const startItem = { ...posRef.current };
    const scale = transformRef.current.scale;
    let lastDx = 0;
    let lastDy = 0;
    let frame = null;

    const onMove = (ev) => {
      const dx = (ev.clientX - startMouse.x) / scale;
      const dy = (ev.clientY - startMouse.y) / scale;
      lastDx = dx;
      lastDy = dy;
      const nx = startItem.x + dx;
      const ny = startItem.y + dy;
      posRef.current = { x: nx, y: ny };
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          frame = null;
          if (elRef.current) elRef.current.style.translate = `${lastDx}px ${lastDy}px`;
        });
      }
    };

    const onUp = () => {
      setLifted(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (frame !== null) cancelAnimationFrame(frame);
      if (elRef.current) {
        elRef.current.style.left = `${posRef.current.x}px`;
        elRef.current.style.top = `${posRef.current.y}px`;
        elRef.current.style.translate = 'none';
      }
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
    willChange: lifted ? 'translate, transform, filter' : 'auto',
    display: 'block',
  };

  if (video) {
    return (
      <video
        data-card
        ref={elRef}
        src={src}
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
