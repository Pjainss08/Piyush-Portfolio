import { useState, useEffect } from 'react';

// Returns true when the viewport is desktop-width (above the mobile breakpoint)
// but too narrow for both sidebars to coexist comfortably with the canvas.
export default function useNarrowDesktop(min = 768, max = 1200) {
  const query = `(min-width: ${min + 1}px) and (max-width: ${max}px)`;
  const [narrow, setNarrow] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setNarrow(e.matches);
    mq.addEventListener('change', handler);
    setNarrow(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return narrow;
}
