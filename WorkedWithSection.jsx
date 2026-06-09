import React, { memo } from 'react';

// Velar — composite of icon + wordmark, displayed inline at fixed height
function VelarLogo({ height = 30 }) {
  // Original design: 118x27 bounding box, mark 22x27, wordmark 90x19 offset (28, 4)
  const scale = height / 27;
  return (
    <div style={{ position: 'relative', width: 118 * scale, height }}>
      <img
        src="/clients/velar-mark.svg"
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 22 * scale,
          height: 27 * scale,
          display: 'block',
        }}
      />
      <img
        src="/clients/velar-text.svg"
        alt="Velar"
        draggable={false}
        style={{
          position: 'absolute',
          left: 28 * scale,
          top: 4 * scale,
          width: 90 * scale,
          height: 19 * scale,
          display: 'block',
        }}
      />
    </div>
  );
}

function WorkedWithSection() {
  const logoStyle = (h) => ({
    height: h,
    width: 'auto',
    display: 'block',
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
  });

  return (
    <div
      data-no-pan
      style={{
        position: 'absolute',
        left: 2470,
        top: -200,
        width: 800,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 500,
        fontSize: 25,
        letterSpacing: '-0.04em',
        lineHeight: '27px',
        color: 'var(--figma-text)',
      }}>
        Worked With
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 19, alignItems: 'center' }}>
        {/* Row 1 — 5 logos */}
        <div style={{ display: 'flex', gap: 39, alignItems: 'center' }}>
          <img src="/clients/innercircle.svg" alt="Inner Circle" draggable={false} style={logoStyle(29)} />
          <img src="/clients/bento.svg" alt="Bento" draggable={false} style={logoStyle(31)} />
          <img src="/clients/base.svg" alt="Base" draggable={false} style={logoStyle(31)} />
          <img src="/clients/firstdollar.webp" alt="First Dollar" draggable={false} style={logoStyle(34)} />
          <VelarLogo height={30} />
        </div>
        {/* Row 2 — 3 logos */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          <img src="/clients/marico.webp" alt="Marico" draggable={false} style={logoStyle(47)} />
          <img src="/clients/bricx.webp" alt="Bricx" draggable={false} style={logoStyle(35)} />
          <img src="/clients/dacoit.svg" alt="Dacoit" draggable={false} style={logoStyle(32)} />
        </div>
      </div>
    </div>
  );
}

export default memo(WorkedWithSection);
