import React, { useRef, useEffect, useState, useCallback } from 'react';
import ProjectCard from './ProjectCard.jsx';
import { PAGES, PROJECTS } from './canvasData.js';

function CanvasTextItem({ item, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  return (
    <div
      data-card
      style={{ position: 'absolute', left: item.x, top: item.y, minWidth: 40, cursor: 'default' }}
      onDoubleClick={(e) => { e.stopPropagation(); setEditing(true); }}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => { setEditing(false); text.trim() ? onUpdate(item.id, { text }) : onDelete(item.id); }}
          onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); if (e.key === 'Escape') { setText(item.text); setEditing(false); } }}
          style={{
            background: 'transparent', border: '1px solid #0d99ff', borderRadius: 2,
            color: '#333', fontSize: item.fontSize || 24, fontFamily: 'Inter, sans-serif',
            padding: '2px 4px', outline: 'none', minWidth: 100,
          }}
        />
      ) : (
        <span style={{
          fontSize: item.fontSize || 24, color: '#333', fontFamily: 'Inter, sans-serif',
          userSelect: 'none', padding: '2px 4px', borderRadius: 2, border: '1px solid transparent',
        }}>
          {text}
        </span>
      )}
    </div>
  );
}

function CanvasShapeItem({ item }) {
  const isCircle = item.shapeType === 'circle';
  const isLine = item.shapeType === 'line';

  if (isLine) {
    const dx = item.width;
    const dy = item.height;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return (
      <div
        data-card
        style={{
          position: 'absolute', left: item.x, top: item.y,
          width: len, height: 2,
          background: item.color,
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 0',
          cursor: 'default',
        }}
      />
    );
  }

  return (
    <div
      data-card
      style={{
        position: 'absolute',
        left: item.x, top: item.y,
        width: Math.abs(item.width), height: Math.abs(item.height),
        borderRadius: isCircle ? '50%' : 0,
        border: `2px solid ${item.color}`,
        background: `${item.color}20`,
        cursor: 'default',
      }}
    />
  );
}

function CanvasCommentItem({ item, onUpdate }) {
  const [expanded, setExpanded] = useState(true);
  const [text, setText] = useState(item.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (expanded && !item.text && inputRef.current) inputRef.current.focus();
  }, [expanded, item.text]);

  return (
    <div data-card style={{ position: 'absolute', left: item.x, top: item.y, zIndex: 10 }}>
      <div
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        style={{
          width: 28, height: 28, borderRadius: '50%', background: '#0d99ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {item.author || 'PJ'}
      </div>
      {expanded && (
        <div style={{
          position: 'absolute', top: 32, left: 0, background: '#fff', borderRadius: 8,
          padding: 10, minWidth: 180, boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          border: '1px solid #e5e5e5',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#333', marginBottom: 4 }}>{item.author || 'PJ'}</div>
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => onUpdate(item.id, { text })}
            placeholder="Add a comment..."
            style={{
              width: '100%', minHeight: 40, background: '#f5f5f5', border: '1px solid #e5e5e5',
              borderRadius: 4, color: '#333', fontSize: 12, fontFamily: 'Inter, sans-serif',
              padding: 6, outline: 'none', resize: 'vertical',
            }}
          />
        </div>
      )}
    </div>
  );
}

// Drag preview for shape creation
function DragPreview({ dragState, transform }) {
  if (!dragState) return null;
  const { startX, startY, currentX, currentY, shapeType } = dragState;
  const x = Math.min(startX, currentX);
  const y = Math.min(startY, currentY);
  const w = Math.abs(currentX - startX);
  const h = Math.abs(currentY - startY);

  if (shapeType === 'line') {
    const dx = currentX - startX;
    const dy = currentY - startY;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return (
      <div style={{
        position: 'absolute', left: startX, top: startY,
        width: len, height: 2, background: '#0d99ff',
        transform: `rotate(${angle}deg)`, transformOrigin: '0 0',
        pointerEvents: 'none', opacity: 0.7,
      }} />
    );
  }

  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w, height: h,
      border: '2px solid #0d99ff', background: 'rgba(13,153,255,0.1)',
      borderRadius: shapeType === 'circle' ? '50%' : 0,
      pointerEvents: 'none',
    }} />
  );
}

export default function Canvas({
  transform, handlers, containerRef, isPanning,
  selectedCard, onSelectCard,
  canvasBg, activeTool, shapeType, onCanvasClick,
  canvasItems, setCanvasItems, onResetTool,
}) {
  const [dragState, setDragState] = useState(null);

  const getWorldCoords = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (e.clientX - rect.left - transform.x) / transform.scale,
      y: (e.clientY - rect.top - transform.y) / transform.scale,
    };
  }, [transform, containerRef]);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('[data-card]') || e.target.closest('[data-no-pan]')) return;
    if (activeTool === 'shape' && e.button === 0) {
      const { x, y } = getWorldCoords(e);
      setDragState({ startX: x, startY: y, currentX: x, currentY: y, shapeType });
      e.preventDefault();
    }
  }, [activeTool, shapeType, getWorldCoords]);

  const handleMouseMove = useCallback((e) => {
    if (dragState) {
      const { x, y } = getWorldCoords(e);
      setDragState(prev => prev ? { ...prev, currentX: x, currentY: y } : null);
    }
  }, [dragState, getWorldCoords]);

  const handleMouseUp = useCallback(() => {
    if (dragState) {
      const { startX, startY, currentX, currentY, shapeType: st } = dragState;
      const w = currentX - startX;
      const h = currentY - startY;
      // Only create shape if dragged a minimum distance
      if (Math.abs(w) > 5 || Math.abs(h) > 5) {
        const newItem = {
          id: `item-${Date.now()}`,
          type: 'shape',
          shapeType: st,
          x: st === 'line' ? startX : Math.min(startX, currentX),
          y: st === 'line' ? startY : Math.min(startY, currentY),
          width: st === 'line' ? w : Math.abs(w),
          height: st === 'line' ? h : Math.abs(h),
          color: '#0d99ff',
        };
        setCanvasItems(prev => [...prev, newItem]);
      }
      setDragState(null);
      onResetTool();
    }
  }, [dragState, setCanvasItems, onResetTool]);

  const handleClick = useCallback((e) => {
    if (e.target.closest('[data-card]') || e.target.closest('[data-no-pan]')) return;
    if (dragState) return; // don't handle click during drag

    if (activeTool === 'text' || activeTool === 'comment') {
      const { x, y } = getWorldCoords(e);
      onCanvasClick(x, y);
      onResetTool();
    } else if (activeTool === 'move') {
      onSelectCard(null);
    }
  }, [activeTool, dragState, getWorldCoords, onCanvasClick, onSelectCard, onResetTool]);

  const updateItem = useCallback((id, updates) => {
    setCanvasItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, [setCanvasItems]);

  const deleteItem = useCallback((id) => {
    setCanvasItems(prev => prev.filter(item => item.id !== id));
  }, [setCanvasItems]);

  const cursorMap = {
    move: isPanning ? 'grabbing' : 'grab',
    text: 'text',
    shape: 'crosshair',
    comment: 'crosshair',
  };

  // Merge handlers: canvas pan handlers + shape drag handlers
  const mergedHandlers = {
    ...handlers,
    onMouseDown: (e) => {
      handleMouseDown(e);
      if (activeTool === 'move') handlers.onMouseDown(e);
    },
    onMouseMove: (e) => {
      if (dragState) {
        handleMouseMove(e);
      } else {
        handlers.onMouseMove(e);
      }
    },
    onMouseUp: (e) => {
      if (dragState) {
        handleMouseUp();
      } else {
        handlers.onMouseUp(e);
      }
    },
    onMouseLeave: (e) => {
      if (dragState) handleMouseUp();
      handlers.onMouseLeave(e);
    },
  };

  return (
    <div
      ref={containerRef}
      className="canvas-viewport"
      style={{
        background: canvasBg,
        cursor: cursorMap[activeTool] || 'grab',
      }}
      {...mergedHandlers}
      onClick={handleClick}
    >
      {/* World container */}
      <div
        className="canvas-world"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {/* Page region labels */}
        {PAGES.map(page => (
          <div
            key={page.id}
            style={{
              position: 'absolute', left: page.x, top: page.y - 40,
              fontSize: 14, fontWeight: 600, color: '#999',
              letterSpacing: '0.02em', pointerEvents: 'none',
            }}
          >
            {page.label}
          </div>
        ))}

        {/* Project cards */}
        {PROJECTS.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={selectedCard === project.id}
            onSelect={onSelectCard}
          />
        ))}

        {/* User-placed items */}
        {canvasItems.map(item => {
          if (item.type === 'text') return <CanvasTextItem key={item.id} item={item} onUpdate={updateItem} onDelete={deleteItem} />;
          if (item.type === 'shape') return <CanvasShapeItem key={item.id} item={item} />;
          if (item.type === 'comment') return <CanvasCommentItem key={item.id} item={item} onUpdate={updateItem} />;
          return null;
        })}

        {/* Drag preview */}
        <DragPreview dragState={dragState} transform={transform} />
      </div>
    </div>
  );
}
