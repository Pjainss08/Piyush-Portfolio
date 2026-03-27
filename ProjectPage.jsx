import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCanvas from './useCanvas.js';
import { PROJECT_DETAILS, ALL_PROJECTS } from './projectData.js';

function CanvasItem({ item }) {
  const baseStyle = { position: 'absolute', left: item.x, top: item.y };

  switch (item.type) {
    case 'hero':
      return (
        <div style={{ ...baseStyle, width: item.width, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <img src={item.image} alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      );
    case 'heading':
      return (
        <div style={{ ...baseStyle, fontSize: 32, fontWeight: 700, color: '#1e1e1e', fontFamily: "'Figtree', sans-serif", letterSpacing: '-0.03em' }}>
          {item.text}
        </div>
      );
    case 'text':
      return (
        <div style={{ ...baseStyle, width: item.width, fontSize: 15, color: '#666', fontFamily: "'Figtree', sans-serif", lineHeight: 1.6, letterSpacing: '-0.02em' }}>
          {item.text}
        </div>
      );
    case 'label':
      return (
        <div style={{ ...baseStyle, fontSize: 11, fontWeight: 600, color: '#aaa', fontFamily: "'Figtree', sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {item.text}
        </div>
      );
    case 'section':
      return (
        <div style={{ ...baseStyle, fontSize: 13, fontWeight: 600, color: '#aaa', fontFamily: "'Figtree', sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {item.text}
        </div>
      );
    case 'card':
      return (
        <div style={{
          ...baseStyle, width: item.width || 280, minHeight: item.height || 200,
          background: '#fff', borderRadius: 8, border: '1px solid #e0e0e0',
          padding: 0, overflow: 'hidden',
        }}>
          {item.image && (
            <img src={item.image} alt="" style={{ width: '100%', display: 'block' }} />
          )}
          {item.title && (
            <div style={{ padding: '12px 16px 4px', fontSize: 14, fontWeight: 600, color: '#1e1e1e', fontFamily: "'Figtree', sans-serif" }}>
              {item.title}
            </div>
          )}
          {item.desc && (
            <div style={{ padding: '0 16px 12px', fontSize: 12, color: '#888', fontFamily: "'Figtree', sans-serif", lineHeight: 1.5 }}>
              {item.desc}
            </div>
          )}
        </div>
      );
    case 'placeholder':
      return (
        <div style={{
          ...baseStyle, width: item.width, height: item.height,
          borderRadius: 8, border: '1px solid #ddd', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 4,
        }}>
          <span style={{ color: '#ccc', fontSize: 13, fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>{item.label}</span>
          {item.sublabel && <span style={{ color: '#ddd', fontSize: 11, fontFamily: "'Figtree', sans-serif" }}>{item.sublabel}</span>}
        </div>
      );
    case 'sticky':
      return (
        <div style={{
          ...baseStyle, width: item.width || 200, padding: 14,
          background: item.color || '#FEFF9C', borderRadius: 2,
          boxShadow: '2px 3px 8px rgba(0,0,0,0.06)',
          fontSize: 13, color: '#444', fontFamily: "'Figtree', sans-serif",
          lineHeight: 1.5, transform: `rotate(${(item.x % 7) - 3}deg)`,
        }}>
          {item.text}
        </div>
      );
    case 'connector':
      return null; // future: draw lines between items
    default:
      return null;
  }
}

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECT_DETAILS[id];
  const { transform, handlers, containerRef, isPanning } = useCanvas({ x: 40, y: 20, scale: 0.75 });

  const currentIndex = ALL_PROJECTS.findIndex(p => p.id === id);

  if (!project) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, fontFamily: "'Figtree', sans-serif" }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>Project not found</div>
        <div onClick={() => navigate('/')} style={{ color: '#0d99ff', cursor: 'pointer' }}>Back to portfolio</div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#F5F0EB' }}>

      {/* Top bar — FigJam style */}
      <div style={{
        height: 48, display: 'flex', alignItems: 'center', padding: '0 12px',
        background: '#fff', borderBottom: '1px solid #e8e8e8', flexShrink: 0, zIndex: 50,
        justifyContent: 'space-between',
      }}>
        {/* Left: FigJam logo + tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* FigJam-ish icon */}
          <div
            onClick={() => navigate('/')}
            style={{
              width: 32, height: 32, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#666',
            }}
            title="Back to portfolio"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>

          {/* Project tabs */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 0,
            background: '#f5f5f5', borderRadius: 8, padding: 3,
          }}>
            {ALL_PROJECTS.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/project/${p.id}`)}
                style={{
                  padding: '5px 14px', borderRadius: 6, cursor: 'pointer',
                  fontSize: 13, fontWeight: p.id === id ? 600 : 400,
                  fontFamily: "'Figtree', sans-serif",
                  color: p.id === id ? '#1e1e1e' : '#999',
                  background: p.id === id ? '#fff' : 'transparent',
                  boxShadow: p.id === id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {p.title}
              </div>
            ))}
          </div>
        </div>

        {/* Right: avatar + share */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden' }}>
            <img src="/pj-avatar.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#0d99ff', color: '#fff', padding: '6px 14px',
                borderRadius: 6, fontSize: 12, fontWeight: 600,
                fontFamily: "'Figtree', sans-serif", cursor: 'pointer',
              }}>
                Visit
              </div>
            </a>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="canvas-viewport"
        style={{ flex: 1, cursor: isPanning ? 'grabbing' : 'grab', background: '#F5F0EB' }}
        {...handlers}
      >
        <div
          className="canvas-world"
          style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }}
        >
          {project.canvasItems.map((item, i) => (
            <CanvasItem key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom toolbar — FigJam style (minimal) */}
      <div style={{
        position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 50, display: 'flex', alignItems: 'center', gap: 2,
        background: '#fff', borderRadius: 10, padding: '6px 12px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0',
      }}>
        {/* Prev */}
        <div
          onClick={() => {
            const prev = ALL_PROJECTS[(currentIndex - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length];
            navigate(`/project/${prev.id}`);
          }}
          style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 6, cursor: 'pointer', color: '#666',
          }}
          title="Previous project"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>

        <div style={{
          padding: '0 12px', fontSize: 13, fontWeight: 500, color: '#666',
          fontFamily: "'Figtree', sans-serif", whiteSpace: 'nowrap',
        }}>
          {currentIndex + 1} / {ALL_PROJECTS.length}
        </div>

        {/* Next */}
        <div
          onClick={() => {
            const next = ALL_PROJECTS[(currentIndex + 1) % ALL_PROJECTS.length];
            navigate(`/project/${next.id}`);
          }}
          style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 6, cursor: 'pointer', color: '#666',
          }}
          title="Next project"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
