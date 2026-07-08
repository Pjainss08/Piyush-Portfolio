import React, { memo } from 'react';
import { motion } from 'motion/react';

// Tag styles from Figma CSS
export const TAG_STYLES = {
  'Rebrand': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Visual Design': { color: '#FF5100', bg: 'rgba(255, 81, 0, 0.10)' },
  'Product Design': { color: '#00B25D', bg: 'rgba(0, 178, 93, 0.10)' },
  'Website Design': { color: '#8253FF', bg: 'rgba(130, 83, 255, 0.10)' },
  'Mini App Design': { color: '#FF2ADF', bg: 'rgba(255, 42, 223, 0.10)' },
};

const PLACEHOLDER_PARA = "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia";

const RAW_WORK_PROJECTS = [
  {
    id: 'velar',
    title: 'Velar',
    description: 'Velar is a DeFi liquidity protocol built on Bitcoin. Trade, provide liquidity, and earn rewards',
    image: '/work/velar/card.webp',
    logo: '/work/velar/logo.webp',
    tags: ['Website Design', 'Product Design'],
    url: 'https://velar.co',
    role: 'Product Designer · Website Designer',
    problem: "Bitcoin has the most secure and trusted network in the world but almost no usable DeFi interface. Users had the asset, but nowhere to actually put it to work. Velar needed a product experience that made Bitcoin DeFi feel as accessible as any modern DeFi platform.",
    problemImage: '/work/velar/v3.webp',
    approach: [
      "Designed the product interface across Velar's core suite — DEX, Perpetual DEX, and Launchpad.",
      'Built the marketing website to communicate a complex multi-product protocol clearly and confidently.',
      'Kept the visual language premium and technical — matching the weight of building on Bitcoin.',
    ],
    overview: null,
    details: null,
    gallery: [
      '/work/velar/hero.webp',
      '/work/velar/portfolio.webp',
      '/work/velar/design-01.webp',
      '/work/velar/design-03.webp',
      '/work/velar/design-04.webp',
      '/work/velar/footer.webp',
    ],
  },
  {
    id: 'crowwd',
    title: 'Crowwd',
    description: 'Crowwd is a platform for crowdfunding and community-driven project building',
    image: '/work/crowwd/card.webp',
    logo: '/work/crowwd/logo.webp',
    tags: ['Product Design', 'Visual Design'],
    url: null,
    role: 'Product Designer',
    problem: "Most crowdfunding platforms are cluttered and complex. Add crypto and onchain payments to that and most people just drop off. Crowwwd needed to feel nothing like that.",
    problemImage: '/work/crowwd/bento.webp',
    approach: [
      "Designed a layout that's clean and easy to scan, no overwhelming UI, no unnecessary steps.",
      'Cut out crypto jargon so anyone could understand what they\'re doing and why.',
      'Made onchain payments feel as simple as any regular transaction.',
      'Clear, intentional screens that guide users without friction.',
    ],
    afterApproachImage: '/work/crowwd/after-approach.webp',
    overview: null,
    details: null,
    gallery: [
      '/work/crowwd/cover.webp',
      '/work/crowwd/profile.webp',
      '/work/crowwd/project-creation.webp',
      '/work/crowwd/project-info.webp',
    ],
  },
  {
    id: 'bento',
    title: 'Bento.fun',
    description: 'Bento.fun is a social prediction market platform built to turn predictions into playable, repeatable community experiences',
    image: '/work/bento/card.webp',
    logo: '/work/bento/logo.webp',
    tags: ['Rebrand', 'Visual Design', 'Product Design'],
    url: 'https://bento.fun',
    role: 'Brand Designer · Product Designer',
    problem: 'Prediction markets focus on bets, not behaviour. They lack social features and shared memory, making them overwhelming and exclusive. Bento aims to be the opposite.',
    brandTiles: [
      '/work/bento/tile-orange.webp',
      '/work/bento/tile-black.webp',
      '/work/bento/tile-green.webp',
      '/work/bento/tile-blue.webp',
    ],
    approach: [
      'Built visual identity to make predictions fun, social, and accessible to all.',
      'Designed website to be inviting and clear, matching product personality.',
      'Led product design for alpha MVP, including user-generated markets and contests.',
      'Focused on community-driven flexible gameplay.',
      'Created launch videos and social creatives to extend brand energy.',
    ],
    appHero: '/work/bento/app-hero.webp',
    overview: null,
    details: null,
    video: '/work/bento/website-video.mp4',
    gallery: [
      '/work/bento/all-tournaments.webp',
      '/work/bento/tournament.webp',
      '/work/bento/create-details.webp',
    ],
  },
  {
    id: 'inner-circle',
    title: 'Inner Circle',
    description: 'Inner Circle is a community of 10,000+ founders, creators, developers, designers on Base',
    image: '/work/inner-circle/card.webp',
    logo: '/work/inner-circle/logo.webp',
    tags: ['Website Design', 'Visual Design'],
    url: 'https://innercircle.so',
    role: 'Visual Designer · Website Designer',
    overview: null,
    details: null,
    approach: [
      'Rebuilt the visual identity to match the pivot from Web3 to AI — same energy, new direction.',
      'Designed the full website from scratch and developed it using Claude.',
    ],
    video: '/work/inner-circle/website.mp4',
    gallery: [
      '/work/inner-circle/cards.webp',
      '/work/inner-circle/footer.webp',
    ],
    videoBottom: '/work/inner-circle/full-tour.mp4',
  },
  {
    id: 'emerge',
    title: 'First Dollar',
    description: 'A curated talent network of 200k+ creators, designers, developers, testers, marketers, and community builders.',
    image: '/work/emerge/card.webp',
    logo: '/work/emerge/logo.webp',
    tags: ['Visual Design', 'Product Design'],
    url: 'https://firstdollar.money/',
    role: 'Product Designer',
    problem: "First Dollar was built for Web3 builders but the vision was bigger than that. We wanted anyone on the internet to be able to join, find work, and earn. The existing product felt too niche, too crypto-native to make that leap.",
    problemImage: '/work/emerge/sidebar.webp',
    approach: [
      "Redesigned the full product with a new visual theme — minimal, clean, and accessible without losing the existing brand identity.",
      "Designed the Verified Talent feature giving skilled builders and creators a way to stand out and get matched with the right opportunities.",
      "Built out the profile and showcase feature so every builder has a page that tells their story, proves their work, and can be shared anywhere on the internet.",
    ],
    overview: null,
    details: null,
    gallery: [
      '/work/emerge/showcase.webp',
      '/work/emerge/feed.webp',
      '/work/emerge/contest.webp',
      '/work/emerge/hero.webp',
    ],
  },
];

export const WORK_PROJECTS = RAW_WORK_PROJECTS.map(p => ({
  ...p,
  overview: p.overview === null ? null : (p.overview || PLACEHOLDER_PARA),
  details: p.details === null ? null : (p.details || PLACEHOLDER_PARA),
  gallery: p.gallery === null ? null : (p.gallery || [p.image, p.image, p.image, p.image]),
}));

function WorkCard({ project, x, y, onOpen }) {
  return (
    <motion.div
      data-card
      onClick={(e) => { e.stopPropagation(); onOpen && onOpen(project); }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 420,
        marginRight: 85,
        cursor: 'pointer',
        zIndex: 1,
        willChange: 'transform',
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
          cursor: 'pointer',
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
    </motion.div>
  );
}

function WorkSection({ onOpenWork }) {
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
          onOpen={onOpenWork}
        />
      ))}
    </>
  );
}

export default memo(WorkSection);
