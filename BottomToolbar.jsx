import React, { useState, useRef } from 'react';
import { STICKY_COLORS } from './Canvas.jsx';

const toolIcons = {
  move: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9.308 12.486-5.84-1.348a.591.591 0 0 1-.183-1.077l.485-.305a51.2 51.2 0 0 1 16.548-6.734.556.556 0 0 1 .66.66 51.2 51.2 0 0 1-6.734 16.548l-.305.485a.592.592 0 0 1-1.077-.183l-1.348-5.84a2.94 2.94 0 0 0-2.206-2.206Z" />
    </svg>
  ),
  sticky: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8" />
      <path d="M14 21l6-6" />
      <path d="M14 15v6" />
      <path d="M20 15h-6" />
    </svg>
  ),
  rectangle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  ),
  circle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.85 12a9.15 9.15 0 1 0 18.3 0 9.15 9.15 0 0 0-18.3 0Z" />
    </svg>
  ),
  line: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
  ),
  rectangleTool: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
};

const SHAPE_OPTIONS = [
  { id: 'rectangle', label: 'Rectangle', icon: toolIcons.rectangle, shortcut: 'R' },
  { id: 'line', label: 'Line', icon: toolIcons.line, shortcut: 'L' },
  { id: 'circle', label: 'Ellipse', icon: toolIcons.circle, shortcut: 'O' },
];

const STICKY_OPTIONS = STICKY_COLORS.map(c => ({
  ...c,
  label: c.id.charAt(0).toUpperCase() + c.id.slice(1),
}));

export default function BottomToolbar({ activeTool, shapeType, stickyColor, onToolChange, onShapeTypeChange, onStickyColorChange }) {
  const [hoveredTool, setHoveredTool] = useState(null);
  const stickyTimeout = useRef(null);
  const shapeTimeout = useRef(null);

  const handleMouseEnter = (tool, timeoutRef) => {
    clearTimeout(timeoutRef.current);
    setHoveredTool(tool);
  };

  const handleMouseLeave = (timeoutRef) => {
    timeoutRef.current = setTimeout(() => setHoveredTool(null), 200);
  };

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

      {/* Sticky Note */}
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => handleMouseEnter('sticky', stickyTimeout)}
        onMouseLeave={() => handleMouseLeave(stickyTimeout)}
      >
        <ToolBtn
          active={activeTool === 'sticky'}
          label="Sticky Note"
          onClick={() => onToolChange('sticky')}
        >
          {toolIcons.sticky}
          <div style={{
            position: 'absolute', bottom: 3, right: 3,
            width: 6, height: 6, borderRadius: '50%',
            background: (STICKY_COLORS.find(c => c.id === stickyColor) || STICKY_COLORS[0]).bg,
            border: '1px solid rgba(0,0,0,0.15)',
          }} />
        </ToolBtn>

        {hoveredTool === 'sticky' && (
          <DropdownMenu>
            {STICKY_OPTIONS.map(opt => (
              <DropdownItem
                key={opt.id}
                selected={stickyColor === opt.id}
                onClick={() => {
                  onStickyColorChange(opt.id);
                  onToolChange('sticky');
                  setHoveredTool(null);
                }}
              >
                <span style={{ width: 20, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                  {stickyColor === opt.id && toolIcons.check}
                </span>
                <div style={{
                  width: 16, height: 16, borderRadius: 3,
                  background: opt.bg, border: '1px solid rgba(0,0,0,0.1)',
                  flexShrink: 0,
                }} />
                <span>{opt.label}</span>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </div>

      {/* Shape */}
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => handleMouseEnter('shape', shapeTimeout)}
        onMouseLeave={() => handleMouseLeave(shapeTimeout)}
      >
        <ToolBtn
          active={activeTool === 'shape'}
          label="Shape"
          onClick={() => { onToolChange('shape'); onShapeTypeChange(shapeType); }}
        >
          {currentShapeIcon}
          <div style={{
            position: 'absolute', bottom: 3, right: 3,
            width: 0, height: 0,
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderTop: `3px solid ${activeTool === 'shape' ? '#fff' : '#999'}`,
          }} />
        </ToolBtn>

        {hoveredTool === 'shape' && (
          <DropdownMenu>
            {SHAPE_OPTIONS.map(opt => (
              <DropdownItem
                key={opt.id}
                selected={shapeType === opt.id}
                onClick={() => {
                  onShapeTypeChange(opt.id);
                  onToolChange('shape');
                  setHoveredTool(null);
                }}
              >
                <span style={{ width: 20, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                  {shapeType === opt.id && toolIcons.check}
                </span>
                <span style={{ display: 'flex', flexShrink: 0 }}>{opt.icon}</span>
                <span style={{ flex: 1 }}>{opt.label}</span>
                <span style={{ color: '#888', fontSize: 12, fontWeight: 400 }}>{opt.shortcut}</span>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

function DropdownMenu({ children }) {
  return (
    <div data-no-pan style={{
      position: 'absolute',
      bottom: 46,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#2c2c2c',
      borderRadius: 8,
      padding: '4px 0',
      minWidth: 180,
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      border: '1px solid #444',
      zIndex: 100,
    }}>
      {children}
    </div>
  );
}

function DropdownItem({ children, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-no-pan
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 12px',
        cursor: 'pointer',
        color: '#e0e0e0',
        fontSize: 13,
        fontWeight: 500,
        background: hovered ? '#3d3d3d' : 'transparent',
        transition: 'background 0.08s',
      }}
    >
      {children}
    </div>
  );
}

function ToolBtn({ children, active, label, onClick }) {
  return (
    <div
      data-no-pan
      title={label}
      onClick={onClick}
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
