import React from 'react';
import PLAYGROUND_IMAGES, { isVideo } from './playgroundImages.js';

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
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

const itemStyle = {
  width: '100%',
  display: 'block',
  marginBottom: 10,
  breakInside: 'avoid',
  WebkitColumnBreakInside: 'avoid',
  pageBreakInside: 'avoid',
  borderRadius: 6,
};

export default function MobilePlayground() {
  return (
    <div
      style={{
        padding: 10,
        columnCount: 2,
        columnGap: 10,
        background: 'var(--figma-bg)',
      }}
    >
      {SHUFFLED_IMAGES.map((src, i) => {
        if (isVideo(src)) {
          return (
            <video
              key={i}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              style={itemStyle}
            />
          );
        }
        return (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            loading="lazy"
            style={itemStyle}
          />
        );
      })}
    </div>
  );
}
