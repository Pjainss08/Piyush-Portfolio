export const PAGES = [
  { id: 'about', label: 'About', x: 620, y: 300 },
  { id: 'work', label: 'Work', x: 2860, y: 500 },
  { id: 'playground', label: 'Playground', x: 850, y: 2500 },
  { id: 'builds', label: 'Builds', x: 2660, y: 2100 },
];

export const PROJECTS = [
  // About region — collage (rendered by AboutSection component, these are layer entries only)
  { id: 'about-collage', title: 'About Collage', page: 'about', x: 0, y: 0, width: 1200, height: 800, color: 'transparent', description: 'Personal introduction collage' },

  // Work region — rendered by WorkSection component
  { id: 'work-bento', title: 'Bento.fun', page: 'work', x: 2200, y: 80, width: 420, height: 380, color: 'transparent', description: 'Social layer for prediction market' },
  { id: 'work-inner-circle', title: 'Inner Circle', page: 'work', x: 2660, y: 80, width: 420, height: 380, color: 'transparent', description: 'Community of 10,000+ founders' },
  { id: 'work-velar', title: 'Velar', page: 'work', x: 3120, y: 80, width: 420, height: 380, color: 'transparent', description: 'DeFi protocol on Bitcoin' },
  { id: 'work-emerge', title: 'Emerge', page: 'work', x: 2430, y: 500, width: 420, height: 380, color: 'transparent', description: 'Visual & Mini App Design' },
  { id: 'work-crowwd', title: 'Crowwd', page: 'work', x: 2890, y: 500, width: 420, height: 380, color: 'transparent', description: 'Product Design' },

  // Playground region — image collage (rendered by PlaygroundSection component)
  { id: 'playground-collage', title: 'Playground Collage', page: 'playground', x: 0, y: 1700, width: 1400, height: 900, color: 'transparent', description: 'Experiments and explorations' },

  // Builds region — rendered by BuildsSection component
  { id: 'build-farfield', title: 'Farfiled', page: 'builds', x: 2300, y: 1700, width: 420, height: 380, color: 'transparent', description: 'Social store for creatives to sell their assets onchain' },
  { id: 'build-dither-matrix', title: 'Dither Matrix', page: 'builds', x: 2760, y: 1700, width: 420, height: 380, color: 'transparent', description: 'Dither tool made for designers' },
  { id: 'build-pixel-pop', title: 'Pixel Pop Tool', page: 'builds', x: 3220, y: 1700, width: 420, height: 380, color: 'transparent', description: 'Convert any image into pixel art' },
  { id: 'build-freetype-writer', title: 'Freetype Writer', page: 'builds', x: 2760, y: 2220, width: 420, height: 380, color: 'transparent', description: 'Write like a typewriter and export' },
];

export const SOCIAL_LINKS = [
  { label: 'X (Twitter)', url: 'https://x.com/piyushxpj', hasSettings: true },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/piyushjainxpj/' },
  { label: 'Instagram', url: 'https://www.instagram.com/pj.piyush_/' },
  { label: 'Email', email: 'hey@piyushjain.in' },
];
