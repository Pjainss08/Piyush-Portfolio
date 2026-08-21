import { useRef, useCallback, useEffect } from 'react';
import { animate } from 'motion';

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// Imperative canvas: pan/zoom mutate DOM directly via worldRef + transformRef.
// React state is intentionally NOT used for transform — children never re-render on pan/zoom.
export default function useCanvas(initialTransform = { x: -50, y: -50, scale: 0.7 }) {
  const transformRef = useRef(initialTransform);
  const worldRef = useRef(null);
  const containerRef = useRef(null);
  const isPanning = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startTransform = useRef(initialTransform);
  const animRef = useRef(null);
  const frameRef = useRef(null);

  const flushTransform = useCallback(() => {
    frameRef.current = null;
    const t = transformRef.current;
    if (worldRef.current) {
      worldRef.current.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scale})`;
    }
  }, []);

  // Pointer and wheel events can arrive much faster than the display refreshes.
  // Collapse them into one compositor update per animation frame.
  const applyTransform = useCallback(() => {
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(flushTransform);
    }
  }, [flushTransform]);

  const commitTransform = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    flushTransform();
  }, [flushTransform]);

  // Apply once on mount
  useEffect(() => {
    commitTransform();
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [commitTransform]);

  const stopAnimation = useCallback(() => {
    if (animRef.current) { animRef.current.stop?.(); animRef.current = null; }
  }, []);

  // Native wheel listener — writes directly to DOM, no React re-render
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      stopAnimation();

      const rect = el.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const prev = transformRef.current;
      const modeMultiplier = e.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? rect.height : 1;
      const delta = e.deltaY * modeMultiplier;
      const zoomFactor = e.ctrlKey || e.metaKey ? 0.01 : 0.001;
      const newScale = clamp(prev.scale * Math.exp(-delta * zoomFactor), 0.05, 4);
      const ratio = newScale / prev.scale;

      transformRef.current = {
        x: cursorX - (cursorX - prev.x) * ratio,
        y: cursorY - (cursorY - prev.y) * ratio,
        scale: newScale,
      };
      applyTransform();
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [stopAnimation, applyTransform]);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('[data-card]') || e.target.closest('[data-no-pan]')) return;
    if (e.button !== 0) return;

    stopAnimation();
    isPanning.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    startTransform.current = { ...transformRef.current };
    containerRef.current?.classList.add('is-panning');
  }, [stopAnimation]);

  const handleMouseMove = useCallback((e) => {
    if (!isPanning.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    transformRef.current = {
      ...transformRef.current,
      x: startTransform.current.x + dx,
      y: startTransform.current.y + dy,
    };
    applyTransform();
  }, [applyTransform]);

  const handleMouseUp = useCallback(() => {
    if (!isPanning.current) return;
    isPanning.current = false;
    containerRef.current?.classList.remove('is-panning');
  }, []);

  const panTo = useCallback((targetX, targetY, targetScale, instant = false) => {
    stopAnimation();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const scale = targetScale || 0.7;
    const destX = rect.width / 2 - targetX * scale;
    const destY = rect.height / 2 - targetY * scale;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (instant || reduceMotion) {
      transformRef.current = { x: destX, y: destY, scale };
      commitTransform();
      return;
    }

    const from = { ...transformRef.current };
    animRef.current = animate(0, 1, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (t) => {
        transformRef.current = {
          x: from.x + (destX - from.x) * t,
          y: from.y + (destY - from.y) * t,
          scale: from.scale + (scale - from.scale) * t,
        };
        applyTransform();
      },
    });
  }, [stopAnimation, applyTransform, commitTransform]);

  return {
    worldRef,
    containerRef,
    transformRef,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
    },
    panTo,
  };
}
