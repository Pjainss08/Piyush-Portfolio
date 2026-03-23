import React, { useState, useCallback, useEffect } from 'react';
import LeftSidebar from './LeftSidebar.jsx';
import RightSidebar from './RightSidebar.jsx';
import Canvas from './Canvas.jsx';
import BottomToolbar from './BottomToolbar.jsx';
import useCanvas from './useCanvas.js';

export default function App() {
  const { transform, handlers, containerRef, isPanning, panTo } = useCanvas();
  const [activePage, setActivePage] = useState('about');
  const [selectedCard, setSelectedCard] = useState(null);
  const [canvasBg, setCanvasBg] = useState('#F2F2F2');
  const [activeTool, setActiveTool] = useState('move');
  const [shapeType, setShapeType] = useState('rectangle');
  const [stickyColor, setStickyColor] = useState('yellow');
  const [canvasItems, setCanvasItems] = useState([]);
  const [isDark, setIsDark] = useState(false);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--figma-bg', '#1e1e1e');
      root.style.setProperty('--figma-surface', '#2c2c2c');
      root.style.setProperty('--figma-surface-hover', '#363636');
      root.style.setProperty('--figma-border', '#3d3d3d');
      root.style.setProperty('--figma-text', '#ffffff');
      root.style.setProperty('--figma-text-secondary', '#999999');
      root.style.setProperty('--figma-text-tertiary', '#666666');
      root.style.setProperty('--figma-blue-bg', 'rgba(13, 153, 255, 0.15)');
      setCanvasBg('#1e1e1e');
    } else {
      root.style.setProperty('--figma-bg', '#f5f5f5');
      root.style.setProperty('--figma-surface', '#ffffff');
      root.style.setProperty('--figma-surface-hover', '#f0f0f0');
      root.style.setProperty('--figma-border', '#e0e0e0');
      root.style.setProperty('--figma-text', '#1e1e1e');
      root.style.setProperty('--figma-text-secondary', '#666666');
      root.style.setProperty('--figma-text-tertiary', '#999999');
      root.style.setProperty('--figma-blue-bg', 'rgba(13, 153, 255, 0.1)');
      setCanvasBg('#F2F2F2');
    }
  }, [isDark]);

  // Pan to About section on initial load
  useEffect(() => {
    panTo(620, 300);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.closest('input, textarea')) return;

      switch (e.key) {
        case 'Escape':
          setActiveTool('move');
          setSelectedCard(null);
          break;
        case 'v':
        case 'V':
          setActiveTool('move');
          break;
        case 's':
        case 'S':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            setActiveTool('sticky');
          }
          break;
        case 'r':
        case 'R':
          setActiveTool('shape');
          setShapeType('rectangle');
          break;
        case 'o':
        case 'O':
          setActiveTool('shape');
          setShapeType('circle');
          break;
        case 'l':
        case 'L':
          setActiveTool('shape');
          setShapeType('line');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handlePageClick = useCallback((page) => {
    setActivePage(page.id);
    setSelectedCard(null);
    const scales = { about: 0.7, work: 0.5, playground: 0.45, builds: 0.5 };
    panTo(page.x, page.y, scales[page.id] || 0.7);
  }, [panTo]);

  const handleCardClick = useCallback((project) => {
    if (typeof project === 'string' || project === null) {
      setSelectedCard(project);
      return;
    }
    setSelectedCard(project.id);
    setActivePage(project.page);
    panTo(project.x - 100, project.y - 100, 0.7);
  }, [panTo]);

  const resetTool = useCallback(() => {
    setActiveTool('move');
  }, []);

  const handleCanvasClick = useCallback((worldX, worldY) => {
    if (activeTool === 'move') {
      setSelectedCard(null);
      return;
    }

    const newItem = {
      id: `item-${Date.now()}`,
      type: activeTool,
      x: worldX,
      y: worldY,
    };

    if (activeTool === 'sticky') {
      newItem.type = 'sticky';
      newItem.text = '';
      newItem.color = stickyColor;
    }

    setCanvasItems(prev => [...prev, newItem]);
  }, [activeTool, stickyColor]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Main area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Left Sidebar */}
        <LeftSidebar
          activePage={activePage}
          onPageClick={handlePageClick}
          selectedCard={selectedCard}
          onCardClick={handleCardClick}
        />

        {/* Canvas */}
        <Canvas
          transform={transform}
          handlers={handlers}
          containerRef={containerRef}
          isPanning={isPanning}
          selectedCard={selectedCard}
          onSelectCard={(id) => setSelectedCard(id)}
          canvasBg={canvasBg}
          activeTool={activeTool}
          shapeType={shapeType}
          onCanvasClick={handleCanvasClick}
          canvasItems={canvasItems}
          setCanvasItems={setCanvasItems}
          onResetTool={resetTool}
          stickyColor={stickyColor}
        />

        {/* Bottom Toolbar (floating over canvas) */}
        <BottomToolbar
          activeTool={activeTool}
          shapeType={shapeType}
          stickyColor={stickyColor}
          onToolChange={setActiveTool}
          onShapeTypeChange={setShapeType}
          onStickyColorChange={setStickyColor}
        />

        {/* Right Sidebar */}
        <RightSidebar
          selectedCard={selectedCard}
          canvasBg={canvasBg}
          onCanvasBgChange={setCanvasBg}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />
      </div>
    </div>
  );
}
