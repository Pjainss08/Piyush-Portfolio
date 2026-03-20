import React, { useState, useRef, useEffect } from 'react';

const toolIcons = {
  move: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9.308 12.486-5.84-1.348a.591.591 0 0 1-.183-1.077l.485-.305a51.2 51.2 0 0 1 16.548-6.734.556.556 0 0 1 .66.66 51.2 51.2 0 0 1-6.734 16.548l-.305.485a.592.592 0 0 1-1.077-.183l-1.348-5.84a2.94 2.94 0 0 0-2.206-2.206Z" />
    </svg>
  ),
  text: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 19v-6m-7 6V5m4 8h6M4 5h12" />
    </svg>
  ),
  rectangle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  ),
  circle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.85 12a9.15 9.15 0 1 0 18.3 0 9.15 9.15 0 0 0-18.3 0Z" />
    </svg>
  ),
  line: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
  ),
  comment: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.508 9.08c0-2.129 0-3.193.414-4.005a3.8 3.8 0 0 1 1.661-1.66C5.396 3 6.46 3 8.588 3h6.84c2.127 0 3.191 0 4.004.414a3.8 3.8 0 0 1 1.66 1.66c.415.813.415 1.877.415 4.006v4.56c0 .705 0 1.058-.047 1.353a3.8 3.8 0 0 1-3.159 3.16c-.57.09-1.148 0-1.72.054a1.9 1.9 0 0 0-1.232.616c-.334.37-.61.802-.91 1.2-.824 1.1-1.237 1.651-1.743 1.848a1.9 1.9 0 0 1-1.377 0c-.506-.197-.919-.747-1.744-1.848-.298-.398-.575-.83-.91-1.2a1.9 1.9 0 0 0-1.231-.616c-.571-.053-1.15.035-1.72-.055a3.8 3.8 0 0 1-3.159-3.159c-.047-.295-.047-.648-.047-1.354z" />
    </svg>
  ),
};

const SHAPE_OPTIONS = [
  { id: 'rectangle', label: 'Rectangle', icon: toolIcons.rectangle },
  { id: 'circle', label: 'Circle', icon: toolIcons.circle },
  { id: 'line', label: 'Line', icon: toolIcons.line },
];

export default function BottomToolbar({ activeTool, shapeType, onToolChange, onShapeTypeChange }) {
  const [showShapeMenu, setShowShapeMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowShapeMenu(false);
      }
    };
    if (showShapeMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showShapeMenu]);

  const currentShapeIcon = SHAPE_OPTIONS.find(s => s.id === shapeType)?.icon || toolIcons.rectangle;

  return (
    <div style={{
      position: 'absolute',
      bottom: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      background: '#ffffff',
      borderRadius: 10,
      padding: '6px 8px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
    }}>
      {/* Move */}
      <ToolBtn active={activeTool === 'move'} label="Move" onClick={() => onToolChange('move')}>
        {toolIcons.move}
      </ToolBtn>

      {/* Text */}
      <ToolBtn active={activeTool === 'text'} label="Text" onClick={() => onToolChange('text')}>
        {toolIcons.text}
      </ToolBtn>

      {/* Shape (with submenu) */}
      <div ref={menuRef} style={{ position: 'relative' }}>
        <ToolBtn
          active={activeTool === 'shape'}
          label="Shape"
          onClick={() => { onToolChange('shape'); onShapeTypeChange(shapeType); }}
          onContextMenu={(e) => { e.preventDefault(); setShowShapeMenu(true); }}
        >
          {currentShapeIcon}
          {/* Small triangle indicator */}
          <div style={{
            position: 'absolute', bottom: 3, right: 3,
            width: 0, height: 0,
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderTop: `3px solid ${activeTool === 'shape' ? '#fff' : '#999'}`,
          }} />
        </ToolBtn>

        {/* Long press / click also opens menu */}
        <div
          data-no-pan
          style={{
            position: 'absolute', bottom: 2, right: 2, width: 12, height: 12,
            cursor: 'pointer', zIndex: 2,
          }}
          onClick={(e) => { e.stopPropagation(); setShowShapeMenu(!showShapeMenu); }}
        />

        {/* Shape submenu */}
        {showShapeMenu && (
          <div data-no-pan style={{
            position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)',
            background: '#ffffff', border: '1px solid #e0e0e0', borderRadius: 8,
            padding: 4, minWidth: 140, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}>
            {SHAPE_OPTIONS.map(opt => (
              <div
                key={opt.id}
                data-no-pan
                onClick={() => {
                  onShapeTypeChange(opt.id);
                  onToolChange('shape');
                  setShowShapeMenu(false);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px', borderRadius: 4, cursor: 'pointer',
                  color: shapeType === opt.id ? '#fff' : '#666',
                  background: shapeType === opt.id ? '#0d99ff' : 'transparent',
                  fontSize: 12, transition: 'all 0.1s',
                }}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment */}
      <ToolBtn active={activeTool === 'comment'} label="Comment" onClick={() => onToolChange('comment')}>
        {toolIcons.comment}
      </ToolBtn>
    </div>
  );
}

function ToolBtn({ children, active, label, onClick, onContextMenu }) {
  return (
    <div
      data-no-pan
      title={label}
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        width: 36, height: 36, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 8, cursor: 'pointer',
        color: active ? '#fff' : '#666',
        background: active ? '#0d99ff' : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </div>
  );
}
