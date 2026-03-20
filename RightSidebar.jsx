import React, { useState } from 'react';
import { PROJECTS, SOCIAL_LINKS } from './canvasData.js';

const ArrowUpRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.999 5.516a30.2 30.2 0 0 1 7.797-.152.94.94 0 0 1 .568.272m.12 8.365a30.2 30.2 0 0 0 .152-7.797.95.95 0 0 0-.272-.568m0 0L5.636 18.364" />
  </svg>
);

export default function RightSidebar({ selectedCard, canvasBg, onCanvasBgChange }) {
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
          background: 'linear-gradient(135deg, #0d99ff, #a259ff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: '#fff',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          PJ
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
          fontFamily: 'Inter, sans-serif',
        }}>
          Share
        </button>
      </div>

      {/* Design tab only */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--figma-border)',
        padding: '0 12px',
      }}>
        <div style={{
          padding: '8px 12px',
          fontSize: 11,
          fontWeight: 500,
          color: '#fff',
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
        <span style={{ color: '#fff', fontSize: 11 }}>{canvasBg.replace('#', '').toUpperCase()}</span>
        <span style={{ color: '#999', fontSize: 11, marginLeft: 'auto' }}>100 %</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" fill="#666" />
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
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div className="prop-row" style={{ justifyContent: 'space-between', cursor: 'pointer' }}>
            <span style={{ color: '#fff', fontSize: 14 }}>{link.label}</span>
            <span style={{ color: '#666', display: 'flex' }}>
              <ArrowUpRight size={14} />
            </span>
          </div>
          {i < SOCIAL_LINKS.length - 1 && (
            <div style={{ height: 1, background: 'var(--figma-border)', margin: '2px 0' }} />
          )}
        </a>
      ))}
    </>
  );
}

function CardProperties({ card }) {
  return (
    <>
      <div style={{ padding: '12px', fontSize: 15, fontWeight: 600, color: '#fff' }}>
        {card.title}
      </div>
      <div style={{ height: 1, background: 'var(--figma-border)' }} />
      <div style={{ padding: '10px 12px', fontSize: 12, color: '#ccc', lineHeight: 1.5 }}>
        {card.description}
      </div>
    </>
  );
}
