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
  const transformRef = useRef(initialTransform);
  transformRef.current = transform;

  // Use native event listeners with { passive: false } to enable preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e) => {
      e.preventDefault();
      const t = transformRef.current;
      if (e.touches.length === 1) {
        touchState.current = {
          type: 'pan',
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          startTx: t.x,
          startTy: t.y,
        };
      } else if (e.touches.length === 2) {
        const dist = getDistance(e.touches[0], e.touches[1]);
        const mid = getMidpoint(e.touches[0], e.touches[1]);
        const rect = el.getBoundingClientRect();
        touchState.current = {
          type: 'pinch',
          startDist: dist,
          startScale: t.scale,
          midX: mid.x - rect.left,
          midY: mid.y - rect.top,
          startTx: t.x,
          startTy: t.y,
        };
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!touchState.current) return;

      if (touchState.current.type === 'pan' && e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchState.current.startX;
        const dy = e.touches[0].clientY - touchState.current.startY;
        setTransform(prev => ({
          ...prev,
          x: touchState.current.startTx + dx,
          y: touchState.current.startTy + dy,
        }));
      } else if (touchState.current.type === 'pinch' && e.touches.length === 2) {
        const dist = getDistance(e.touches[0], e.touches[1]);
        const ratio = dist / touchState.current.startDist;
        const newScale = clamp(touchState.current.startScale * ratio, 0.1, 0.6);
        const scaleRatio = newScale / touchState.current.startScale;
        const midX = touchState.current.midX;
        const midY = touchState.current.midY;
        setTransform({
          x: midX - (midX - touchState.current.startTx) * scaleRatio,
          y: midY - (midY - touchState.current.startTy) * scaleRatio,
          scale: newScale,
        });
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length === 0) {
        touchState.current = null;
      } else if (e.touches.length === 1) {
        const t = transformRef.current;
        touchState.current = {
          type: 'pan',
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          startTx: t.x,
          startTy: t.y,
        };
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return { transform, containerRef };
}
