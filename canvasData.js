export const PAGES = [
  { id: 'about', label: 'About', x: 0, y: 0 },
  { id: 'work', label: 'Work', x: 2200, y: 0 },
  { id: 'playground', label: 'Playground', x: 0, y: 1600 },
  { id: 'builds', label: 'Builds', x: 2200, y: 1600 },
];

export const PROJECTS = [
  // About region — placeholder
  { id: 'about-hero', title: 'About Me', page: 'about', x: 100, y: 100, width: 480, height: 320, color: '#ffffff', description: 'Designer & Developer' },
  { id: 'about-skills', title: 'Skills', page: 'about', x: 650, y: 80, width: 340, height: 240, color: '#f0f0f0', description: 'What I do' },
  { id: 'about-exp', title: 'Experience', page: 'about', x: 200, y: 500, width: 400, height: 280, color: '#e8f4ff', description: 'Where I\'ve been' },
  { id: 'about-contact', title: 'Contact', page: 'about', x: 700, y: 420, width: 300, height: 200, color: '#fff3e0', description: 'Get in touch' },

  // Work region — scattered
  { id: 'work-1', title: 'Project Alpha', page: 'work', x: 2300, y: 80, width: 420, height: 300, color: '#1a1a2e', textColor: '#fff', description: 'Brand Identity' },
  { id: 'work-2', title: 'Project Beta', page: 'work', x: 2800, y: 160, width: 360, height: 260, color: '#16213e', textColor: '#fff', description: 'Web Design' },
  { id: 'work-3', title: 'Project Gamma', page: 'work', x: 2400, y: 450, width: 380, height: 320, color: '#0f3460', textColor: '#fff', description: 'Mobile App' },
  { id: 'work-4', title: 'Project Delta', page: 'work', x: 2900, y: 500, width: 440, height: 280, color: '#533483', textColor: '#fff', description: 'Dashboard UI' },
  { id: 'work-5', title: 'Project Epsilon', page: 'work', x: 2600, y: 850, width: 350, height: 240, color: '#e94560', textColor: '#fff', description: 'Marketing Site' },
  { id: 'work-6', title: 'Project Zeta', page: 'work', x: 3200, y: 120, width: 300, height: 380, color: '#2d4059', textColor: '#fff', description: 'E-commerce' },

  // Playground region — experimental
  { id: 'play-1', title: 'Experiment 01', page: 'playground', x: 100, y: 1700, width: 300, height: 300, color: '#ff6b6b', textColor: '#fff', description: 'Creative coding' },
  { id: 'play-2', title: 'Experiment 02', page: 'playground', x: 480, y: 1750, width: 280, height: 250, color: '#feca57', description: 'Typography play' },
  { id: 'play-3', title: 'Experiment 03', page: 'playground', x: 200, y: 2080, width: 350, height: 260, color: '#48dbfb', description: 'Motion study' },
  { id: 'play-4', title: 'Experiment 04', page: 'playground', x: 620, y: 2050, width: 320, height: 280, color: '#ff9ff3', description: 'Color exploration' },

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
