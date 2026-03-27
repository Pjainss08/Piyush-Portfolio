import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useCanvas from './useCanvas.js';
import { PROJECT_DETAILS, ALL_PROJECTS } from './projectData.js';

const TAG_STYLES = {
  'Rebrand': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Visual Design': { color: '#FF5100', bg: 'rgba(255, 81, 0, 0.10)' },
  'Product Design': { color: '#00B25D', bg: 'rgba(0, 178, 93, 0.10)' },
  'Website Design': { color: '#8253FF', bg: 'rgba(130, 83, 255, 0.10)' },
  'Mini App Design': { color: '#FF2ADF', bg: 'rgba(255, 42, 223, 0.10)' },
  'Branding': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
};

function CanvasItem({ item }) {
  switch (item.type) {
    case 'hero':
      return (
        <div style={{
          position: 'absolute', left: item.x, top: item.y,
          width: item.width, borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <img src={item.image} alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      );
    case 'heading':
      return (
        <div style={{
          position: 'absolute', left: item.x, top: item.y,
          fontSize: 36, fontWeight: 700, color: '#1e1e1e',
          fontFamily: "'Figtree', sans-serif",
          letterSpacing: '-0.03em',
        }}>
          {item.text}
        </div>
      );
    case 'text':
      return (
        <div style={{
          position: 'absolute', left: item.x, top: item.y,
          width: item.width, fontSize: 16, color: '#666',
          fontFamily: "'Figtree', sans-serif",
          lineHeight: 1.6, letterSpacing: '-0.02em',
        }}>
          {item.text}
        </div>
      );
    case 'label':
      return (
        <div style={{
          position: 'absolute', left: item.x, top: item.y,
          fontSize: 12, fontWeight: 600, color: '#999',
          fontFamily: "'Figtree', sans-serif",
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {item.text}
        </div>
      );
    case 'section':
      return (
        <div style={{
          position: 'absolute', left: item.x, top: item.y,
          fontSize: 14, fontWeight: 600, color: '#999',
          fontFamily: "'Figtree', sans-serif",
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {item.text}
        </div>
      );
    case 'placeholder':
      return (
        <div style={{
          position: 'absolute', left: item.x, top: item.y,
          width: item.width, height: item.height,
          borderRadius: 12, border: '2px dashed #ddd',
          background: '#fafafa',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#bbb', fontSize: 14, fontFamily: "'Figtree', sans-serif",
        }}>
          {item.label}
        </div>
      );
    case 'sticky':
      return (
        <div style={{
          position: 'absolute', left: item.x, top: item.y,
          width: item.width, padding: 16,
          background: item.color || '#FEFF9C',
          borderRadius: '2px',
          boxShadow: '2px 4px 12px rgba(0,0,0,0.08)',
          fontSize: 14, color: '#444',
          fontFamily: "'Figtree', sans-serif",
          lineHeight: 1.5,
          transform: `rotate(${(item.x % 5) - 2}deg)`,
        }}>
          {item.text}
        </div>
      );
    default:
      return null;
  }
}

function FloatingSidebar({ currentId }) {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      right: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      background: '#fff',
      borderRadius: 12,
      padding: '8px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
      border: '1px solid #e8e8e8',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      minWidth: 160,
    }}>
      {ALL_PROJECTS.map(p => (
        <div
          key={p.id}
          onClick={() => navigate(`/project/${p.id}`)}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: currentId === p.id ? 600 : 400,
            fontFamily: "'Figtree', sans-serif",
            color: currentId === p.id ? '#1e1e1e' : '#888',
            background: currentId === p.id ? '#f0f0f0' : 'transparent',
            transition: 'all 0.15s',
            letterSpacing: '-0.02em',
          }}
        >
          {p.title}
        </div>
      ))}
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECT_DETAILS[id];
  const { transform, handlers, containerRef, isPanning } = useCanvas({ x: 0, y: 0, scale: 0.8 });

  if (!project) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 16, fontFamily: "'Figtree', sans-serif",
      }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>Project not found</div>
        <Link to="/" style={{ color: '#0d99ff', textDecoration: 'none' }}>Back to portfolio</Link>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: '#F5F0EB',
    }}>
      {/* Top bar */}
      <div style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        background: '#fff',
        borderBottom: '1px solid #e8e8e8',
        flexShrink: 0,
        zIndex: 50,
      }}>
        {/* Back button */}
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            cursor: 'pointer', color: '#666', fontSize: 13,
            fontFamily: "'Figtree', sans-serif",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </div>

        {/* Title */}
        <div style={{
          flex: 1, textAlign: 'center',
          fontSize: 14, fontWeight: 600,
          fontFamily: "'Figtree', sans-serif",
          color: '#1e1e1e',
          letterSpacing: '-0.02em',
        }}>
          {project.title}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6 }}>
          {project.tags.map((tag, i) => {
            const s = TAG_STYLES[tag] || { color: '#666', bg: 'rgba(0,0,0,0.05)' };
            return (
              <span key={i} style={{
                padding: '3px 10px', fontSize: 12, fontWeight: 500,
                color: s.color, background: s.bg, borderRadius: 8,
                fontFamily: "'Figtree', sans-serif",
              }}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="canvas-viewport"
        style={{
          flex: 1,
          cursor: isPanning ? 'grabbing' : 'grab',
          background: '#F5F0EB',
        }}
        {...handlers}
      >
        <div
          className="canvas-world"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          {project.canvasItems.map((item, i) => (
            <CanvasItem key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Floating sidebar */}
      <FloatingSidebar currentId={id} />

      {/* Visit project button */}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1e1e1e',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'Figtree', sans-serif",
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Visit Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      )}
    </div>
  );
}
