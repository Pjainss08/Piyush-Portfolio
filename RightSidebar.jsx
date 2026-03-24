import React, { useState } from 'react';
import { PROJECTS, SOCIAL_LINKS } from './canvasData.js';
import { WORK_PROJECTS } from './WorkSection.jsx';
import { BUILDS_PROJECTS } from './BuildsSection.jsx';

const ArrowUpRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.999 5.516a30.2 30.2 0 0 1 7.797-.152.94.94 0 0 1 .568.272m.12 8.365a30.2 30.2 0 0 0 .152-7.797.95.95 0 0 0-.272-.568m0 0L5.636 18.364" />
  </svg>
);

export default function RightSidebar({ selectedCard, canvasBg, onCanvasBgChange, isDark, onToggleTheme }) {
  const card = selectedCard ? PROJECTS.find(p => p.id === selectedCard) : null;

  return (
    <div className="sidebar" style={{
      width: 256,
      borderLeft: '1px solid var(--figma-border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      zIndex: 40,
    }}>
      {/* Top header — avatar + share */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        borderBottom: '1px solid var(--figma-border)',
      }}>
        {/* Avatar */}
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <img src="/pj-avatar.webp" alt="PJ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Theme icon */}
          <div
            onClick={onToggleTheme}
            style={{ cursor: 'pointer', display: 'flex', color: 'var(--figma-text-secondary)' }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </div>

          {/* Share button */}
          <button style={{
            background: '#0d99ff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '6px 16px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Figtree, sans-serif',
          }}>
            Share
          </button>
        </div>
      </div>

      {/* Design tab */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--figma-border)',
        padding: '0 12px',
      }}>
        <div style={{
          padding: '8px 12px',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--figma-text)',
          borderBottom: '2px solid var(--figma-blue)',
        }}>
          Design
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {card ? <CardProperties card={card} /> : <PageProperties canvasBg={canvasBg} onCanvasBgChange={onCanvasBgChange} />}
      </div>
    </div>
  );
}

function PageProperties({ canvasBg = '#F2F2F2', onCanvasBgChange = () => {} }) {
  const [showPicker, setShowPicker] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  return (
    <>
      {/* Page section */}
      <div className="section-header">Page</div>
      <div className="prop-row" style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setShowPicker(!showPicker)}>
        <div style={{
          width: 16,
          height: 16,
          borderRadius: 3,
          background: canvasBg,
          border: '1px solid var(--figma-border)',
          flexShrink: 0,
        }} />
        <span style={{ color: 'var(--figma-text)', fontSize: 12 }}>{canvasBg.replace('#', '').toUpperCase()}</span>
        <span style={{ color: 'var(--figma-text-tertiary)', fontSize: 12, marginLeft: 'auto' }}>100 %</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--figma-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" fill="var(--figma-text-tertiary)" />
        </svg>
      </div>
      {showPicker && (
        <div style={{ padding: '8px 12px' }}>
          <input
            type="color"
            value={canvasBg}
            onChange={(e) => onCanvasBgChange(e.target.value)}
            style={{
              width: '100%',
              height: 32,
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              background: 'transparent',
              padding: 0,
            }}
          />
          {/* Preset colors */}
          <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
            {['#F2F2F2', '#FFFFFF', '#1E1E1E', '#2C2C2C', '#0D99FF', '#F24E1E', '#0ACF83', '#FF7262', '#A259FF', '#FFC700'].map(c => (
              <div
                key={c}
                onClick={() => onCanvasBgChange(c)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: c,
                  border: canvasBg === c ? '2px solid var(--figma-blue)' : '1px solid var(--figma-border)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 1, background: 'var(--figma-border)', margin: '8px 0' }} />

      {/* Social Links */}
      {SOCIAL_LINKS.map((link, i) => (
        link.email ? (
          <div key={i}>
            <div
              className="prop-row"
              style={{ justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(link.email);
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
              }}
            >
              <span style={{ color: emailCopied ? '#0ACF83' : 'var(--figma-text)', fontSize: 14, transition: 'color 0.2s' }}>
                {emailCopied ? 'Email Copied' : link.label}
              </span>
              <span style={{ color: 'var(--figma-text-tertiary)', display: 'flex' }}>
                <ArrowUpRight size={14} />
              </span>
            </div>
            {i < SOCIAL_LINKS.length - 1 && (
              <div style={{ height: 1, background: 'var(--figma-border)', margin: '2px 0' }} />
            )}
          </div>
        ) : (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div className="prop-row" style={{ justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ color: 'var(--figma-text)', fontSize: 14 }}>{link.label}</span>
              <span style={{ color: 'var(--figma-text-tertiary)', display: 'flex' }}>
                <ArrowUpRight size={14} />
              </span>
            </div>
            {i < SOCIAL_LINKS.length - 1 && (
              <div style={{ height: 1, background: 'var(--figma-border)', margin: '2px 0' }} />
            )}
          </a>
        )
      ))}
    </>
  );
}

const TAG_STYLES = {
  'Rebrand': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Visual Design': { color: '#FF5100', bg: 'rgba(255, 81, 0, 0.10)' },
  'Product Design': { color: '#00B25D', bg: 'rgba(0, 178, 93, 0.10)' },
  'Website Design': { color: '#8253FF', bg: 'rgba(130, 83, 255, 0.10)' },
  'Mini App Design': { color: '#FF2ADF', bg: 'rgba(255, 42, 223, 0.10)' },
};

function CardProperties({ card }) {
  // Check if it's a work or builds project
  const workProject = WORK_PROJECTS.find(p => card.id === `work-${p.id}`) || BUILDS_PROJECTS.find(p => card.id === `build-${p.id}`);

  if (workProject) {
    return (
      <>
        {/* Project image */}
        <div style={{ padding: '12px' }}>
          <img
            src={workProject.image}
            alt={workProject.title}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </div>
        <div style={{ height: 1, background: 'var(--figma-border)' }} />

        {/* Title */}
        <div style={{ padding: '12px 12px 4px', fontSize: 16, fontWeight: 600, color: 'var(--figma-text)' }}>
          {workProject.title}
        </div>

        {/* Description */}
        <div style={{ padding: '0 12px 8px', fontSize: 13, color: 'var(--figma-text-secondary)', lineHeight: 1.5 }}>
          {workProject.description}
        </div>

        {/* Tags */}
        <div style={{ padding: '4px 12px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {workProject.tags.map((tag, i) => {
            const style = TAG_STYLES[tag] || { color: '#666', bg: 'rgba(0,0,0,0.05)' };
            return (
              <span key={i} style={{
                padding: '3px 8px', fontSize: 12, fontWeight: 500,
                color: style.color, background: style.bg, borderRadius: 6,
              }}>
                {tag}
              </span>
            );
          })}
        </div>

        {workProject.url && (
          <>
            <div style={{ height: 1, background: 'var(--figma-border)' }} />
            <a
              href={workProject.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="prop-row" style={{ justifyContent: 'space-between', cursor: 'pointer', padding: '10px 12px' }}>
                <span style={{ color: '#0d99ff', fontSize: 13, fontWeight: 500 }}>Visit Project</span>
                <ArrowUpRight size={14} />
              </div>
            </a>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div style={{ padding: '12px', fontSize: 15, fontWeight: 600, color: 'var(--figma-text)' }}>
        {card.title}
      </div>
      <div style={{ height: 1, background: 'var(--figma-border)' }} />
      <div style={{ padding: '10px 12px', fontSize: 12, color: 'var(--figma-text-secondary)', lineHeight: 1.5 }}>
        {card.description}
      </div>
    </>
  );
}
