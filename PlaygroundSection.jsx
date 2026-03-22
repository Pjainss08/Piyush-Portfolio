import React from 'react';

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

// Distribute images into 5 columns for a horizontal masonry
function buildMasonry(images, cols = 5) {
  const columns = Array.from({ length: cols }, () => []);
  images.forEach((img, i) => {
    columns[i % cols].push(img);
  });
  return columns;
}

export default function PlaygroundSection() {
  const columns = buildMasonry(PLAYGROUND_IMAGES, 5);
  const gap = 10;
  const colWidth = 280;
  const totalWidth = columns.length * (colWidth + gap) - gap;
  const startX = 100;
  const startY = 1700;

  return (
    <div style={{
      position: 'absolute',
      left: startX,
      top: startY,
      width: totalWidth,
      pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex',
        gap: gap,
      }}>
        {columns.map((col, ci) => (
          <div key={ci} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: gap,
            width: colWidth,
          }}>
            {col.map((src, ri) => (
              <img
                key={`${ci}-${ri}`}
                src={src}
                alt=""
                draggable={false}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  display: 'block',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
