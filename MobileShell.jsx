import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MobileTopBar from './MobileTopBar.jsx';
import MobileBottomSheet from './MobileBottomSheet.jsx';
import MobileAbout from './MobileAbout.jsx';
import MobileWorkSection from './MobileWorkSection.jsx';
import MobileBuildsSection from './MobileBuildsSection.jsx';
import MobilePlayground from './MobilePlayground.jsx';

export default function MobileShell({ isDark, onToggleTheme, onOpenWork }) {
  const [activePage, setActivePage] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePageChange = useCallback((pageId) => {
    setActivePage(pageId);
    setMenuOpen(false);
  }, []);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isPlayground = activePage === 'playground';

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--figma-bg)',
      overflow: 'hidden',
    }}>
      <MobileTopBar onMenuOpen={openMenu} />

      {/* Content area */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: 'var(--figma-bg)',
        position: 'relative',
      }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {activePage === 'about' && <MobileAbout />}
            {activePage === 'work' && <MobileWorkSection onOpenWork={onOpenWork} />}
            {activePage === 'playground' && <MobilePlayground />}
            {activePage === 'builds' && <MobileBuildsSection />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Sheet */}
      <MobileBottomSheet
        isOpen={menuOpen}
        onClose={closeMenu}
        activePage={activePage}
        onPageChange={handlePageChange}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
    </div>
  );
}
