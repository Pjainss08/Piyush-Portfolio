import React from 'react';
import { WORK_PROJECTS } from './WorkSection.jsx';

const TAG_STYLES = {
  'Rebrand': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Visual Design': { color: '#FF5100', bg: 'rgba(255, 81, 0, 0.10)' },
  'Product Design': { color: '#00B25D', bg: 'rgba(0, 178, 93, 0.10)' },
  'Website Design': { color: '#8253FF', bg: 'rgba(130, 83, 255, 0.10)' },
  'Mini App Design': { color: '#FF2ADF', bg: 'rgba(255, 42, 223, 0.10)' },
  'Branding': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
};

function MobileCard({ project, onOpen, index = 0 }) {
  return (
    <div
      onClick={() => onOpen && onOpen(project)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <div style={{
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.06)',
        background: '#f0f0f0',
        aspectRatio: '488 / 382',
      }}>
        <img
          src={project.image}
          alt={project.title}
          width={488}
          height={382}
          decoding="async"
          fetchpriority={index < 2 ? 'high' : 'auto'}
          loading={index < 2 ? 'eager' : 'lazy'}
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
        />
      </div>

      {/* Title */}
      <div style={{
        fontSize: 20, fontWeight: 600, color: 'var(--figma-text)',
        marginTop: 14, lineHeight: 1.2,
      }}>
        {project.title}
      </div>

      {/* Description */}
      <div style={{
        fontSize: 15, color: 'var(--figma-text-secondary)',
        marginTop: 6, lineHeight: 1.5,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {project.description}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
        {project.tags.map((tag, i) => {
          const style = TAG_STYLES[tag] || { color: '#666', bg: 'rgba(0,0,0,0.05)' };
          return (
            <span key={i} style={{
              padding: '5px 10px', fontSize: 14, fontWeight: 500,
              color: style.color, background: style.bg, borderRadius: 10,
            }}>
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function MobileWorkSection({ onOpenWork }) {
  return (
    <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {WORK_PROJECTS.map((project, i) => (
        <MobileCard key={project.id} project={project} onOpen={onOpenWork} index={i} />
      ))}
    </div>
  );
}
