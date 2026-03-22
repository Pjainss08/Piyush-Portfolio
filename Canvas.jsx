import React, { useRef, useEffect, useState, useCallback } from 'react';
import ProjectCard from './ProjectCard.jsx';
import AboutSection from './AboutSection.jsx';
import PlaygroundSection from './PlaygroundSection.jsx';
import { PAGES, PROJECTS } from './canvasData.js';

const STICKY_COLORS = [
  { id: 'yellow', bg: '#FEFF9C', fold: '#E6E78C', shadow: 'rgba(200,180,0,0.2)' },
  { id: 'pink', bg: '#FF7EB3', fold: '#E06A9A', shadow: 'rgba(180,60,100,0.2)' },
  { id: 'green', bg: '#B5E8B5', fold: '#9FCC9F', shadow: 'rgba(80,150,80,0.2)' },
  { id: 'blue', bg: '#A7D8F0', fold: '#8FC0D8', shadow: 'rgba(60,120,160,0.2)' },
  { id: 'purple', bg: '#D5B8FF', fold: '#BCA0E6', shadow: 'rgba(120,80,180,0.2)' },
  { id: 'orange', bg: '#FFD59E', fold: '#E6BD88', shadow: 'rgba(180,140,50,0.2)' },
];

function CanvasStickyItem({ item, isSelected, onSelect, onUpdate, onDelete, transform, containerRef }) {
  const [editing, setEditing] = useState(!item.text);
  const [text, setText] = useState(item.text || '');
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleMouseDown = (e) => {
    if (editing) return;
    e.stopPropagation();
    onSelect(item.id);
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      itemX: item.x,
      itemY: item.y,
    };

    const handleMouseMove = (e) => {
      if (!dragStart.current) return;
      const dx = (e.clientX - dragStart.current.mouseX) / transform.scale;
      const dy = (e.clientY - dragStart.current.mouseY) / transform.scale;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setDragging(true);
      onUpdate(item.id, {
        x: dragStart.current.itemX + dx,
        y: dragStart.current.itemY + dy,
      });
    };

    const handleMouseUp = () => {
      dragStart.current = null;
      setTimeout(() => setDragging(false), 0);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    if (text.trim()) {
      onUpdate(item.id, { text });
    } else {
      onDelete(item.id);
    }
  };

  const stickyColor = STICKY_COLORS.find(c => c.id === item.color) || STICKY_COLORS[0];
  // Each sticky gets a deterministic slight rotation based on its id
  const rotation = ((item.id.charCodeAt(item.id.length - 1) % 7) - 3) * 1.2;

  return (
    <div
      data-card
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: 220,
        minHeight: 200,
        transform: `rotate(${rotation}deg)`,
        cursor: editing ? 'text' : dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        filter: isSelected ? 'drop-shadow(0 0 0 transparent)' : 'none',
      }}
    >
      {/* Main paper */}
      <div style={{
        width: '100%',
        minHeight: 200,
        background: stickyColor.bg,
        borderRadius: '2px 2px 2px 2px',
        boxShadow: isSelected
          ? `0 0 0 2px #0d99ff, 2px 4px 12px ${stickyColor.shadow}, 4px 8px 20px rgba(0,0,0,0.12)`
          : `2px 4px 10px ${stickyColor.shadow}, 3px 6px 16px rgba(0,0,0,0.08)`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle top sticky strip */}
        <div style={{
          height: 4,
          background: `linear-gradient(180deg, rgba(0,0,0,0.06) 0%, transparent 100%)`,
          flexShrink: 0,
        }} />

        {editing ? (
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Escape') { setText(item.text || ''); setEditing(false); }
            }}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#444',
              fontSize: 15,
              fontFamily: "'Figtree', sans-serif",
              padding: '14px 16px',
              outline: 'none',
              resize: 'none',
              minHeight: 160,
              lineHeight: 1.6,
            }}
            placeholder="Type here..."
          />
        ) : (
          <div style={{
            flex: 1,
            padding: '14px 16px',
            fontSize: 15,
            color: '#444',
            fontFamily: "'Figtree', sans-serif",
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {text || 'Double click to edit'}
          </div>
        )}

        {/* Bottom-right folded corner */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 28,
          height: 28,
          background: `linear-gradient(135deg, ${stickyColor.bg} 50%, ${stickyColor.fold} 50%)`,
          filter: 'drop-shadow(-1px -1px 1px rgba(0,0,0,0.06))',
        }} />
      </div>

      {/* Selection handles */}
      {isSelected && (
        <>
          <div className="resize-handle" style={{ top: -4, left: -4 }} />
          <div className="resize-handle" style={{ top: -4, right: -4 }} />
          <div className="resize-handle" style={{ bottom: -4, left: -4 }} />
          <div className="resize-handle" style={{ bottom: -4, right: -4 }} />
        </>
      )}
    </div>
  );
}

function CanvasShapeItem({ item, isSelected, onSelect, onUpdate, transform }) {
  const isCircle = item.shapeType === 'circle';
  const isLine = item.shapeType === 'line';
  const w = Math.abs(item.width);
  const h = Math.abs(item.height);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    onSelect(item.id);
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      itemX: item.x,
      itemY: item.y,
    };

    const handleMouseMove = (e) => {
      if (!dragStart.current) return;
      const dx = (e.clientX - dragStart.current.mouseX) / transform.scale;
      const dy = (e.clientY - dragStart.current.mouseY) / transform.scale;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setDragging(true);
      onUpdate(item.id, {
        x: dragStart.current.itemX + dx,
        y: dragStart.current.itemY + dy,
      });
    };

    const handleMouseUp = () => {
      dragStart.current = null;
      setTimeout(() => setDragging(false), 0);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const resizeHandles = isSelected && !isLine ? (
    <>
      <div className="resize-handle" style={{ top: -4, left: -4 }} />
      <div className="resize-handle" style={{ top: -4, right: -4 }} />
      <div className="resize-handle" style={{ bottom: -4, left: -4 }} />
      <div className="resize-handle" style={{ bottom: -4, right: -4 }} />
    </>
  ) : null;

  const sizeLabel = isSelected && !isLine ? (
    <div style={{
      position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
      background: '#0d99ff', color: '#fff', fontSize: 11, fontWeight: 500,
      padding: '2px 8px', borderRadius: 3, whiteSpace: 'nowrap', pointerEvents: 'none',
    }}>
      {Math.round(w)} × {Math.round(h)}
    </div>
  ) : null;

  if (isLine) {
    const dx = item.width;
    const dy = item.height;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return (
      <div
        data-card
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute', left: item.x, top: item.y,
          width: len, height: isSelected ? 4 : 2,
          background: isSelected ? '#0d99ff' : '#999',
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 0',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
      />
    );
  }

  return (
    <div
      data-card
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: item.x, top: item.y,
        width: w, height: h,
        borderRadius: isCircle ? '50%' : 0,
        border: `2px solid ${isSelected ? '#0d99ff' : '#ccc'}`,
        background: '#e5e5e5',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
    >
      {resizeHandles}
      {sizeLabel}
    </div>
  );
}

// Drag preview for shape creation
function DragPreview({ dragState }) {
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
  canvasItems, setCanvasItems, onResetTool, stickyColor,
}) {
  const [dragState, setDragState] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Delete selected canvas item with Delete/Backspace key
  useEffect(() => {
    const handler = (e) => {
      if (selectedItem && (e.key === 'Delete' || e.key === 'Backspace') && !e.target.closest('input, textarea')) {
        setCanvasItems(prev => prev.filter(item => item.id !== selectedItem));
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedItem, setCanvasItems]);

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
      if (Math.abs(w) > 5 || Math.abs(h) > 5) {
        const newItem = {
          id: `item-${Date.now()}`,
          type: 'shape',
          shapeType: st,
          x: st === 'line' ? startX : Math.min(startX, currentX),
          y: st === 'line' ? startY : Math.min(startY, currentY),
          width: st === 'line' ? w : Math.abs(w),
          height: st === 'line' ? h : Math.abs(h),
        };
        setCanvasItems(prev => [...prev, newItem]);
      }
      setDragState(null);
      onResetTool();
    }
  }, [dragState, setCanvasItems, onResetTool]);

  const handleClick = useCallback((e) => {
    if (e.target.closest('[data-card]') || e.target.closest('[data-no-pan]')) return;
    if (dragState) return;

    if (activeTool === 'sticky') {
      const { x, y } = getWorldCoords(e);
      onCanvasClick(x, y);
      onResetTool();
    } else if (activeTool === 'move') {
      onSelectCard(null);
      setSelectedItem(null);
    }
  }, [activeTool, dragState, getWorldCoords, onCanvasClick, onSelectCard, onResetTool]);

  const updateItem = useCallback((id, updates) => {
    setCanvasItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, [setCanvasItems]);

  const deleteItem = useCallback((id) => {
    setCanvasItems(prev => prev.filter(item => item.id !== id));
    if (selectedItem === id) setSelectedItem(null);
  }, [setCanvasItems, selectedItem]);

  const cursorMap = {
    move: isPanning ? 'grabbing' : 'grab',
    sticky: 'crosshair',
    shape: 'crosshair',
  };

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
      <div
        className="canvas-world"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {/* Page region labels (skip About — handled by collage) */}
        {PAGES.filter(p => p.id !== 'about' && p.id !== 'playground').map(page => (
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

        {/* About Section collage */}
        <AboutSection transform={transform} />

        {/* Playground Section collage */}
        <PlaygroundSection />

        {/* Project cards (skip about region — handled by AboutSection) */}
        {PROJECTS.filter(p => p.page !== 'about' && p.page !== 'playground').map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={selectedCard === project.id}
            onSelect={onSelectCard}
          />
        ))}

        {/* User-placed items */}
        {canvasItems.map(item => {
          if (item.type === 'sticky') return (
            <CanvasStickyItem
              key={item.id}
              item={item}
              isSelected={selectedItem === item.id}
              onSelect={(id) => { setSelectedItem(id); onSelectCard(null); }}
              onUpdate={updateItem}
              onDelete={deleteItem}
              transform={transform}
              containerRef={containerRef}
            />
          );
          if (item.type === 'shape') return (
            <CanvasShapeItem
              key={item.id}
              item={item}
              isSelected={selectedItem === item.id}
              onSelect={(id) => { setSelectedItem(id); onSelectCard(null); }}
              onUpdate={updateItem}
              transform={transform}
            />
          );
          return null;
        })}

        {/* Drag preview */}
        <DragPreview dragState={dragState} />
      </div>
    </div>
  );
}

export { STICKY_COLORS };
