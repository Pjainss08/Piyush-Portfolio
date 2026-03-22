import React from 'react';

export default function AboutSection() {
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1200,
      height: 800,
      pointerEvents: 'none',
    }}>
      {/* Notebook */}
      <img
        src="/notebook.png"
        alt=""
        style={{
          position: 'absolute',
          left: -40,
          top: 60,
          width: 280,
          transform: 'rotate(-3deg)',
          filter: 'drop-shadow(4px 6px 12px rgba(0,0,0,0.12))',
          pointerEvents: 'none',
        }}
      />

      {/* Vinyl Record */}
      <img
        src="/vinyl-record.png"
        alt=""
        style={{
          position: 'absolute',
          left: 420,
          top: -20,
          width: 120,
          transform: 'rotate(8deg)',
          filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.2))',
          pointerEvents: 'none',
        }}
      />

      {/* Polaroid — Hey it's me */}
      <img
        src="/polaroid-me.png"
        alt="Hey, it's me"
        style={{
          position: 'absolute',
          left: 280,
          top: 40,
          width: 240,
          transform: 'rotate(-4deg)',
          filter: 'drop-shadow(4px 6px 16px rgba(0,0,0,0.18))',
          pointerEvents: 'none',
        }}
      />

      {/* Polaroid — Mountain */}
      <img
        src="/polaroid-mountain.png"
        alt="Somewhere in the mountains"
        style={{
          position: 'absolute',
          left: 520,
          top: 60,
          width: 220,
          transform: 'rotate(5deg)',
          filter: 'drop-shadow(4px 6px 16px rgba(0,0,0,0.18))',
          pointerEvents: 'none',
        }}
      />

      {/* Blob sticker */}
      <img
        src="/sticker-blob.png"
        alt=""
        style={{
          position: 'absolute',
          left: 180,
          top: 10,
          width: 90,
          transform: 'rotate(6deg)',
          filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.15))',
          pointerEvents: 'none',
        }}
      />

      {/* Spider-Man sticker */}
      <img
        src="/sticker-spiderman.png"
        alt=""
        style={{
          position: 'absolute',
          left: 200,
          top: 420,
          width: 150,
          transform: 'rotate(-5deg)',
          filter: 'drop-shadow(3px 4px 10px rgba(0,0,0,0.2))',
          pointerEvents: 'none',
        }}
      />

      {/* Bio text */}
      <div style={{
        position: 'absolute',
        left: 360,
        top: 400,
        width: 360,
        fontSize: 22,
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 400,
        color: '#333',
        lineHeight: 1.5,
        letterSpacing: '-0.02em',
        pointerEvents: 'none',
      }}>
        hello, i'm piyush jain a designer who loves to build & explore new things. currently exploring ai and products.
      </div>

      {/* SRK sticker */}
      <img
        src="/sticker-srk.png"
        alt=""
        style={{
          position: 'absolute',
          left: 100,
          top: 340,
          width: 130,
          transform: 'rotate(-2deg)',
          filter: 'drop-shadow(3px 4px 10px rgba(0,0,0,0.15))',
          pointerEvents: 'none',
        }}
      />

      {/* Show Your Work book */}
      <img
        src="/book-show-your-work.png"
        alt="Show Your Work by Austin Kleon"
        style={{
          position: 'absolute',
          left: 820,
          top: 80,
          width: 220,
          transform: 'rotate(4deg)',
          filter: 'drop-shadow(4px 6px 14px rgba(0,0,0,0.18))',
          pointerEvents: 'none',
        }}
      />

      {/* "currently reading" label */}
      <div style={{
        position: 'absolute',
        left: 880,
        top: 270,
        fontSize: 14,
        fontFamily: "'Caveat', cursive",
        fontStyle: 'italic',
        color: '#666',
        transform: 'rotate(3deg)',
        pointerEvents: 'none',
      }}>
        currently reading
      </div>

      {/* King / Andy Samberg sticker */}
      <img
        src="/sticker-king.png"
        alt=""
        style={{
          position: 'absolute',
          left: 780,
          top: 320,
          width: 160,
          transform: 'rotate(-3deg)',
          filter: 'drop-shadow(3px 4px 10px rgba(0,0,0,0.15))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
