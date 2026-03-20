import { useState, useRef, useCallback, useEffect } from 'react';
import { animate } from 'motion';

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export default function useCanvas(initialTransform = { x: -50, y: -50, scale: 0.45 }) {
  const [transform, setTransform] = useState(initialTransform);
  const isPanning = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startTransform = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const animRef = useRef([]);
  // Keep a ref to the latest transform for the native wheel handler
  const transformRef = useRef(initialTransform);
  transformRef.current = transform;

  const stopAnimations = useCallback(() => {
    animRef.current.forEach(a => a.stop?.());
    animRef.current = [];
  }, []);

  // Attach wheel listener natively with { passive: false } so preventDefault works
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      stopAnimations();

      const rect = el.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const prev = transformRef.current;
      const zoomFactor = e.ctrlKey || e.metaKey ? 0.01 : 0.001;
      const newScale = clamp(prev.scale * (1 - e.deltaY * zoomFactor), 0.05, 4);
      const ratio = newScale / prev.scale;

      setTransform({
        x: cursorX - (cursorX - prev.x) * ratio,
        y: cursorY - (cursorY - prev.y) * ratio,
        scale: newScale,
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [stopAnimations]);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('[data-card]') || e.target.closest('[data-no-pan]')) return;
    if (e.button !== 0) return;

    stopAnimations();
    isPanning.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    setTransform(prev => {
      startTransform.current = { x: prev.x, y: prev.y };
      return prev;
    });
  }, [stopAnimations]);

  const handleMouseMove = useCallback((e) => {
    if (!isPanning.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setTransform(prev => ({
      ...prev,
      x: startTransform.current.x + dx,
      y: startTransform.current.y + dy,
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const panTo = useCallback((targetX, targetY, targetScale) => {
    stopAnimations();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const scale = targetScale || 0.45;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const destX = centerX - targetX * scale;
    const destY = centerY - targetY * scale;

    setTransform(prev => {
      const fromX = prev.x;
      const fromY = prev.y;
      const fromScale = prev.scale;

      const anim = animate(0, 1, {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (t) => {
          setTransform({
            x: fromX + (destX - fromX) * t,
            y: fromY + (destY - fromY) * t,
            scale: fromScale + (scale - fromScale) * t,
          });
        },
      });
      animRef.current = [anim];

      return prev;
    });
  }, [stopAnimations]);

  return {
    transform,
    containerRef,
    isPanning: isPanning.current,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      // No onWheel here — handled natively via useEffect
    },
    panTo,
  };
}
