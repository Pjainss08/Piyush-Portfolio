import React, { memo } from 'react';
import { motion } from 'motion/react';

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
    title: 'Farfield',
    description: 'Social store for creatives to sell their assets onchain and earn in crypto. Onchain Summer Awards Winner.',
    image: '/builds/Farfield.webp',
    tags: ['Branding', 'Visual Design', 'Mini App Design'],
    url: 'https://farcaster.xyz/miniapps/9OlQm7ZO9S_M/farfield',
  },
  {
    id: 'dither-matrix',
    title: 'Dither Matrix',
    description: 'Dither tool made for designers with various effects to be used while adding custom colors.',
    image: '/builds/Dither%20Matrix.webp',
    tags: ['Visual Design', 'Product Design'],
    url: 'https://dithermatrix.piyushjain.in',
  },
  {
    id: 'pixel-pop',
    title: 'Pixel Pop Tool',
    description: 'Convert any image into pixel art with this tool. Customize the pixel size and color palette.',
    image: '/builds/Pixel%20Pop.webp',
    tags: ['Visual Design', 'Product Design'],
    url: 'https://pixelart.piyushjain.in',
  },
  {
    id: 'freetype-writer',
    title: 'Freetype Writer',
    description: 'A small space to write like a typewriter and export it as txt or a shareable envelope style PNG.',
    image: '/builds/typewriter.webp',
    tags: ['Visual Design', 'Product Design'],
    url: 'https://freetypewriter.piyushjain.in',
  },
];

function BuildCard({ project, x, y }) {
  return (
    <motion.div
      data-card
      onClick={(e) => {
        e.stopPropagation();
        if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer');
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 420,
        cursor: 'pointer',
        zIndex: 1,
        willChange: 'transform',
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        draggable={false}
        style={{
          width: '100%',
          display: 'block',
          cursor: 'pointer',
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
    </motion.div>
  );
}

function BuildsSection() {
  const gap = 40;
  const cardW = 420;
  const startX = 3200;
  const startY = 1700;

  const rowHeight = 520;
  const positions = [
    // Row 1: 3 cards
    { x: startX, y: startY },
    { x: startX + cardW + gap, y: startY },
    { x: startX + (cardW + gap) * 2, y: startY },
    // Row 2: 1 card centered
    { x: startX + (cardW + gap), y: startY + rowHeight },
  ];

  return (
    <>
      {BUILDS_PROJECTS.map((project, i) => (
        <BuildCard
          key={project.id}
          project={project}
          x={positions[i].x}
          y={positions[i].y}
        />
      ))}
    </>
  );
}

export default memo(BuildsSection);
