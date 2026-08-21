import React, { useEffect, useRef } from 'react';
import PLAYGROUND_IMAGES, { isVideo } from './playgroundImages.js';

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function shuffled(arr, seed) {
  const rand = seededRandom(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SHUFFLED_IMAGES = shuffled(PLAYGROUND_IMAGES, 137);

const itemStyle = {
  width: '100%',
  display: 'block',
  marginBottom: 10,
  breakInside: 'avoid',
  WebkitColumnBreakInside: 'avoid',
  pageBreakInside: 'avoid',
  borderRadius: 6,
};

function LazyVideo({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const syncPlayback = () => {
      if (visible && !reduceMotion.matches) element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: '200px' });

    observer.observe(element);
    reduceMotion.addEventListener('change', syncPlayback);
    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener('change', syncPlayback);
      element.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      style={itemStyle}
    />
  );
}

export default function MobilePlayground() {
  return (
    <div
      style={{
        padding: 10,
        columnCount: 2,
        columnGap: 10,
        background: 'var(--figma-bg)',
      }}
    >
      {SHUFFLED_IMAGES.map((src, i) => {
        if (isVideo(src)) {
          return (
            <LazyVideo key={i} src={src} />
          );
        }
        return (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
            style={itemStyle}
          />
        );
      })}
    </div>
  );
}
