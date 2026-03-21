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

  // Escape key resets to move tool
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setActiveTool('move');
        setSelectedCard(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handlePageClick = useCallback((page) => {
    setActivePage(page.id);
    setSelectedCard(null);
    panTo(page.x, page.y);
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
        />
      </div>
    </div>
  );
}
