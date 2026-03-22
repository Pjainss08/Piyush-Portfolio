export const PAGES = [
  { id: 'about', label: 'About', x: 620, y: 300 },
  { id: 'work', label: 'Work', x: 2850, y: 450 },
  { id: 'playground', label: 'Playground', x: 850, y: 1950 },
  { id: 'builds', label: 'Builds', x: 2700, y: 2000 },
];

export const PROJECTS = [
  // About region — collage (rendered by AboutSection component, these are layer entries only)
  { id: 'about-collage', title: 'About Collage', page: 'about', x: 0, y: 0, width: 1200, height: 800, color: 'transparent', description: 'Personal introduction collage' },

  // Work region — scattered
  { id: 'work-1', title: 'Project Alpha', page: 'work', x: 2300, y: 80, width: 420, height: 300, color: '#1a1a2e', textColor: '#fff', description: 'Brand Identity' },
  { id: 'work-2', title: 'Project Beta', page: 'work', x: 2800, y: 160, width: 360, height: 260, color: '#16213e', textColor: '#fff', description: 'Web Design' },
  { id: 'work-3', title: 'Project Gamma', page: 'work', x: 2400, y: 450, width: 380, height: 320, color: '#0f3460', textColor: '#fff', description: 'Mobile App' },
  { id: 'work-4', title: 'Project Delta', page: 'work', x: 2900, y: 500, width: 440, height: 280, color: '#533483', textColor: '#fff', description: 'Dashboard UI' },
  { id: 'work-5', title: 'Project Epsilon', page: 'work', x: 2600, y: 850, width: 350, height: 240, color: '#e94560', textColor: '#fff', description: 'Marketing Site' },
  { id: 'work-6', title: 'Project Zeta', page: 'work', x: 3200, y: 120, width: 300, height: 380, color: '#2d4059', textColor: '#fff', description: 'E-commerce' },

  // Playground region — image collage (rendered by PlaygroundSection component)
  { id: 'playground-collage', title: 'Playground Collage', page: 'playground', x: 0, y: 1700, width: 1400, height: 900, color: 'transparent', description: 'Experiments and explorations' },

  // Builds region — tools & products
  { id: 'build-1', title: 'Tool Alpha', page: 'builds', x: 2300, y: 1700, width: 380, height: 280, color: '#00d2d3', description: 'CLI Tool' },
  { id: 'build-2', title: 'Tool Beta', page: 'builds', x: 2750, y: 1750, width: 340, height: 300, color: '#54a0ff', textColor: '#fff', description: 'VS Code Extension' },
  { id: 'build-3', title: 'Tool Gamma', page: 'builds', x: 2400, y: 2060, width: 400, height: 260, color: '#5f27cd', textColor: '#fff', description: 'Design System' },
  { id: 'build-4', title: 'Tool Delta', page: 'builds', x: 2880, y: 2100, width: 300, height: 240, color: '#01a3a4', textColor: '#fff', description: 'Open Source' },
];

export const SOCIAL_LINKS = [
  { label: 'X (Twitter)', url: 'https://x.com/piyushxpj', hasSettings: true },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/piyushjainxpj/' },
  { label: 'Instagram', url: 'https://www.instagram.com/pj.piyush_/' },
  { label: 'Email', email: 'hey@piyushjain.in' },
];
