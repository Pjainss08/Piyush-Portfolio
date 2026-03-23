import React from 'react';

const TAG_STYLES = {
  'Branding': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Visual Design': { color: '#FF5100', bg: 'rgba(255, 81, 0, 0.10)' },
  'Product Design': { color: '#00B25D', bg: 'rgba(0, 178, 93, 0.10)' },
  'Website Design': { color: '#8253FF', bg: 'rgba(130, 83, 255, 0.10)' },
  'Mini App Design': { color: '#FF2ADF', bg: 'rgba(255, 42, 223, 0.10)' },
};

export const BUILDS_PROJECTS = [
  {
    id: 'farfield',
    title: 'Farfiled',
    description: 'Social store for creatives to sell their assets onchain and earn in crypto. Onchain Summer Awards Winner.',
    image: '/build-farfield.png',
    tags: ['Branding', 'Visual Design', 'Mini App Design'],
    url: 'https://farcaster.xyz/miniapps/9OlQm7ZO9S_M/farfield',
  },
  {
    id: 'dither-matrix',
    title: 'Dither Matrix',
    description: 'Dither tool made for designers with various effects to be used while adding custom colors.',
    image: '/build-dither-matrix.png',
    tags: ['Visual Design', 'Product Design'],
    url: 'https://dithermatrix.piyushjain.in',
  },
  {
    id: 'pixel-pop',
    title: 'Pixel Pop Tool',
    description: 'Convert any image into pixel art with this tool. Customize the pixel size and color palette.',
    image: '/build-pixel-pop.png',
    tags: ['Website Design', 'Product Design'],
    url: 'https://pixel-art-grid-nu.vercel.app',
  },
];

function BuildCard({ project, x, y, onSelect }) {
  return (
    <div
      data-card
      onClick={(e) => { e.stopPropagation(); onSelect && onSelect(`build-${project.id}`); }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 420,
        cursor: 'pointer',
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        draggable={false}
        style={{
          width: '100%',
          display: 'block',
          borderRadius: 14,
        }}
      />

      <div style={{
        marginTop: 16,
        fontSize: 22,
        fontWeight: 600,
        color: 'var(--figma-text)',
        fontFamily: "'Figtree', sans-serif",
        letterSpacing: '-0.03em',
      }}>
        {project.title}
      </div>

      <div style={{
        marginTop: 4,
        fontSize: 16,
        color: 'var(--figma-text-secondary)',
        fontFamily: "'Figtree', sans-serif",
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {project.description}
      </div>

      <div style={{
        marginTop: 12,
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        {project.tags.map((tag, i) => {
          const style = TAG_STYLES[tag] || { color: '#666', bg: 'rgba(0,0,0,0.05)' };
          return (
            <span
              key={i}
              style={{
                display: 'flex',
                padding: '5px 10px',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 500,
                color: style.color,
                fontFamily: "'Figtree', sans-serif",
                letterSpacing: '-0.01em',
                background: style.bg,
                borderRadius: 10,
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function BuildsSection({ onSelectCard }) {
  const gap = 40;
  const cardW = 420;
  const startX = 2300;
  const startY = 1700;

  const positions = [
    { x: startX, y: startY },
    { x: startX + cardW + gap, y: startY },
    { x: startX + (cardW + gap) * 2, y: startY },
  ];

  return (
    <>
      {BUILDS_PROJECTS.map((project, i) => (
        <BuildCard
          key={project.id}
          project={project}
          x={positions[i].x}
          y={positions[i].y}
          onSelect={onSelectCard}
        />
      ))}
    </>
  );
}
