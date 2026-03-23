import React from 'react';

// Tag styles from Figma CSS
const TAG_STYLES = {
  'Rebrand': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Visual Design': { color: '#FF5100', bg: 'rgba(255, 81, 0, 0.10)' },
  'Product Design': { color: '#00B25D', bg: 'rgba(0, 178, 93, 0.10)' },
  'Website Design': { color: '#8253FF', bg: 'rgba(130, 83, 255, 0.10)' },
  'Mini App Design': { color: '#FF2ADF', bg: 'rgba(255, 42, 223, 0.10)' },
};

export const WORK_PROJECTS = [
  {
    id: 'bento',
    title: 'Bento.fun',
    description: 'Bento.fun is a social layer for prediction market. Backed by Yzi Labs',
    image: '/work-bento.png',
    tags: ['Rebrand', 'Visual Design', 'Product Design'],
    url: 'https://bento.fun',
  },
  {
    id: 'inner-circle',
    title: 'Inner Circle',
    description: 'Inner Circle is a community of 10,000+ founders, creators, developers, designers on Base',
    image: '/work-inner-circle.png',
    tags: ['Website Design', 'Visual Design'],
    url: 'https://innercircle.so',
  },
  {
    id: 'velar',
    title: 'Velar',
    description: 'Velar is a DeFi liquidity protocol built on Bitcoin. Trade, provide liquidity, and earn rewards',
    image: '/work-velar.png',
    tags: ['Website Design', 'Product Design'],
    url: 'https://velar.co',
  },
  {
    id: 'emerge',
    title: 'Emerge',
    description: 'Emerge is a creative platform for visual storytelling and mini app experiences',
    image: '/work-emerge.png',
    tags: ['Visual Design', 'Mini App Design'],
    url: 'https://farcaster.xyz/miniapps/pmZbrBBIA6wT/emerge',
  },
  {
    id: 'crowwd',
    title: 'Crowwd',
    description: 'Crowwd is a platform for crowdfunding and community-driven project building',
    image: '/work-crowwd.png',
    tags: ['Product Design', 'Visual Design'],
    url: null,
  },
];

function WorkCard({ project, x, y, onSelect }) {
  return (
    <div
      data-card
      onClick={(e) => { e.stopPropagation(); onSelect && onSelect(`work-${project.id}`); }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 420,
        cursor: 'pointer',
      }}
    >
      {/* Image — no wrapper, just the image with natural aspect ratio */}
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

      {/* Title */}
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

      {/* Description — 2 lines max */}
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

      {/* Tags */}
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

export default function WorkSection({ onSelectCard }) {
  const gap = 40;
  const cardW = 420;
  const startX = 2200;
  const startY = 80;
  const rowHeight = 520;

  const positions = [
    // Row 1: 3 cards
    { x: startX, y: startY },
    { x: startX + cardW + gap, y: startY },
    { x: startX + (cardW + gap) * 2, y: startY },
    // Row 2: 2 cards centered
    { x: startX + (cardW + gap) * 0.5, y: startY + rowHeight },
    { x: startX + (cardW + gap) * 1.5, y: startY + rowHeight },
  ];

  return (
    <>
      {WORK_PROJECTS.map((project, i) => (
        <WorkCard
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
