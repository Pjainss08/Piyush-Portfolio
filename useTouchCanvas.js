import { useState, useRef, useCallback, useEffect } from 'react';

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function getDistance(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getMidpoint(t1, t2) {
  return {
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  };
}

export default function useTouchCanvas(initialTransform = { x: 0, y: 0, scale: 0.35 }) {
  const [transform, setTransform] = useState(initialTransform);
  const containerRef = useRef(null);
  const touchState = useRef(null);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchState.current = {
        type: 'pan',
        startX: t.clientX,
        startY: t.clientY,
        startTx: transform.x,
        startTy: transform.y,
      };
    } else if (e.touches.length === 2) {
      const dist = getDistance(e.touches[0], e.touches[1]);
      const mid = getMidpoint(e.touches[0], e.touches[1]);
      const rect = containerRef.current?.getBoundingClientRect();
      touchState.current = {
        type: 'pinch',
        startDist: dist,
        startScale: transform.scale,
        midX: mid.x - (rect?.left || 0),
        midY: mid.y - (rect?.top || 0),
        startTx: transform.x,
        startTy: transform.y,
      };
    }
  }, [transform]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    if (!touchState.current) return;

    if (touchState.current.type === 'pan' && e.touches.length === 1) {
      const t = e.touches[0];
      const dx = t.clientX - touchState.current.startX;
      const dy = t.clientY - touchState.current.startY;
      setTransform(prev => ({
        ...prev,
        x: touchState.current.startTx + dx,
        y: touchState.current.startTy + dy,
      }));
    } else if (touchState.current.type === 'pinch' && e.touches.length === 2) {
      const dist = getDistance(e.touches[0], e.touches[1]);
      const ratio = dist / touchState.current.startDist;
      const newScale = clamp(touchState.current.startScale * ratio, 0.15, 2.0);
      const scaleRatio = newScale / touchState.current.startScale;
      const midX = touchState.current.midX;
      const midY = touchState.current.midY;
      setTransform({
        x: midX - (midX - touchState.current.startTx) * scaleRatio,
        y: midY - (midY - touchState.current.startTy) * scaleRatio,
        scale: newScale,
      });
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length === 0) {
      touchState.current = null;
    } else if (e.touches.length === 1) {
      // Switched from pinch to pan
      const t = e.touches[0];
      setTransform(prev => {
        touchState.current = {
          type: 'pan',
          startX: t.clientX,
          startY: t.clientY,
          startTx: prev.x,
          startTy: prev.y,
        };
        return prev;
      });
    }
  }, []);

  // Prevent default on the container to avoid browser gestures
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e) => e.preventDefault();
    el.addEventListener('touchmove', prevent, { passive: false });
    return () => el.removeEventListener('touchmove', prevent);
  }, []);

  return {
    transform,
    containerRef,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
