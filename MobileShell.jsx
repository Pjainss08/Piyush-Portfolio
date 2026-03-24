import React, { useState } from 'react';
import MobileTopBar from './MobileTopBar.jsx';
import MobileBottomSheet from './MobileBottomSheet.jsx';
import MobileAbout from './MobileAbout.jsx';
import MobileWorkSection from './MobileWorkSection.jsx';
import MobileBuildsSection from './MobileBuildsSection.jsx';
import MobilePlayground from './MobilePlayground.jsx';

export default function MobileShell({ isDark, onToggleTheme }) {
  const [activePage, setActivePage] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    setMenuOpen(false);
  };

  const isPlayground = activePage === 'playground';

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--figma-bg)',
      overflow: 'hidden',
    }}>
      <MobileTopBar onMenuOpen={() => setMenuOpen(true)} />

      {/* Content area */}
      <div style={{
        flex: 1,
        overflow: isPlayground ? 'hidden' : 'auto',
        WebkitOverflowScrolling: 'touch',
        background: isPlayground ? 'var(--figma-canvas, #f5f5f5)' : 'var(--figma-bg)',
      }}>
        {activePage === 'about' && <MobileAbout />}
        {activePage === 'work' && <MobileWorkSection />}
        {activePage === 'playground' && <MobilePlayground />}
        {activePage === 'builds' && <MobileBuildsSection />}
      </div>

      {/* Bottom Sheet */}
      <MobileBottomSheet
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activePage={activePage}
        onPageChange={handlePageChange}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
    </div>
  );
}
