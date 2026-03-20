import React from 'react';

export default function ProjectCard({ project, isSelected, onSelect }) {
  const { id, title, x, y, width, height, color, textColor, description } = project;

  return (
    <div
      data-card={id}
      className={`project-card ${isSelected ? 'selected' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        background: color || '#fff',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
    >
      {/* Frame label */}
      <div className="frame-label">{title}</div>

      {/* Card content */}
      <div style={{
        padding: 24,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        color: textColor || '#333',
      }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{description}</div>
      </div>

      {/* Resize handles — only when selected */}
      {isSelected && (
        <>
          <div className="resize-handle" style={{ top: -4, left: -4 }} />
          <div className="resize-handle" style={{ top: -4, right: -4 }} />
          <div className="resize-handle" style={{ bottom: -4, left: -4 }} />
          <div className="resize-handle" style={{ bottom: -4, right: -4 }} />
          {/* Edge midpoints */}
          <div className="resize-handle" style={{ top: -4, left: '50%', marginLeft: -4 }} />
          <div className="resize-handle" style={{ bottom: -4, left: '50%', marginLeft: -4 }} />
          <div className="resize-handle" style={{ top: '50%', left: -4, marginTop: -4 }} />
          <div className="resize-handle" style={{ top: '50%', right: -4, marginTop: -4 }} />
        </>
      )}
    </div>
  );
}
