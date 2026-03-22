import React, { useState } from 'react';
import { PAGES, PROJECTS } from './canvasData.js';

// Pikaicons stroke paths (viewBox 0 0 24 24)
const icons = {
  figmaLogo: (
    <svg width="20" height="20" viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
  ),
  chevronDown: (size = 14) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 10.14a20.4 20.4 0 0 0 3.702 3.893c.175.141.42.141.596 0A20.4 20.4 0 0 0 16 10.14" />
    </svg>
  ),
  chevronRight: (size = 14) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 8.14a20.4 20.4 0 0 1 3.894 3.701.47.47 0 0 1 0 .596A20.4 20.4 0 0 1 10 16.139" />
    </svg>
  ),
  page: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2.058V3.2c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C16.28 8 17.12 8 18.8 8h1.142M14 2.058C13.607 2 13.136 2 12.349 2H10.4c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748C4 5.04 4 6.16 4 8.4v7.2c0 2.24 0 3.36.436 4.216a4 4 0 0 0 1.748 1.748C7.04 22 8.16 22 10.4 22h3.2c2.24 0 3.36 0 4.216-.436a4 4 0 0 0 1.748-1.748C20 18.96 20 17.84 20 15.6V9.651c0-.787 0-1.257-.058-1.651M14 2.058q.143.02.277.053c.408.098.798.26 1.156.478.404.248.75.594 1.442 1.286l1.25 1.25c.692.692 1.038 1.038 1.286 1.442a4 4 0 0 1 .479 1.156q.031.134.052.277" />
    </svg>
  ),
  frame: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v4m0 0v10M7 7h10M7 7H3m4 10v4m0-4h10M7 17H3M21 7h-4m0 0V3m0 4v10m0 0v4m0-4h4" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 21-6.05-6.05m0 0a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9Z" />
    </svg>
  ),
  sidebarToggle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  ),
};

export default function LeftSidebar({ activePage, onPageClick, selectedCard, onCardClick }) {
  const [layersOpen, setLayersOpen] = useState(true);
  const [expandedPages, setExpandedPages] = useState({ about: true, work: true, playground: true, builds: true });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const togglePage = (pageId) => {
    setExpandedPages(prev => ({ ...prev, [pageId]: !prev[pageId] }));
  };

  const filteredProjects = searchQuery
    ? PROJECTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : PROJECTS;

  const groupedProjects = PAGES.map(page => ({
    ...page,
    projects: filteredProjects.filter(p => p.page === page.id),
  }));

  return (
    <div className="sidebar" style={{
      width: 240,
      borderRight: '1px solid var(--figma-border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      zIndex: 40,
    }}>
      {/* Top header — file name */}
      <div style={{ padding: '12px 12px 10px 12px', borderBottom: '1px solid var(--figma-border)' }}>
        <div style={{ marginBottom: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--figma-text)' }}>Piyush Jain</span>
            {icons.chevronDown(12)}
          </div>
          <span style={{ fontSize: 14, color: 'var(--figma-text-secondary)', marginTop: 2, display: 'block' }}>Portfolio</span>
        </div>
      </div>

      {/* File tab */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--figma-border)',
        padding: '0 12px',
      }}>
        <div style={{
          padding: '8px 12px',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--figma-text)',
          borderBottom: '2px solid var(--figma-blue)',
          cursor: 'pointer',
        }}>
          File
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{ color: searchOpen ? 'var(--figma-text)' : 'var(--figma-text-tertiary)', cursor: 'pointer' }}
          onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(''); }}
        >
          {icons.search}
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--figma-border)' }}>
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); } }}
            placeholder="Search layers..."
            style={{
              width: '100%',
              background: 'var(--figma-surface-hover)',
              border: '1px solid var(--figma-border)',
              borderRadius: 4,
              color: 'var(--figma-text)',
              fontSize: 12,
              padding: '6px 8px',
              fontFamily: 'Figtree, sans-serif',
              outline: 'none',
            }}
          />
        </div>
      )}

      {/* Pages section */}
      <div>
        <div className="section-header">
          <span>Pages</span>
        </div>
        {PAGES.map(page => (
          <div
            key={page.id}
            className={`sidebar-item ${activePage === page.id ? 'active' : ''}`}
            onClick={() => onPageClick(page)}
          >
            {icons.page}
            <span>{page.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--figma-border)', margin: '4px 0' }} />

      {/* Layers section */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div
          className="section-header"
          onClick={() => setLayersOpen(!layersOpen)}
          style={{ cursor: 'pointer' }}
        >
          <span>Layers</span>
          <span style={{
            color: 'var(--figma-text-tertiary)',
            transform: layersOpen ? 'rotate(0)' : 'rotate(-90deg)',
            transition: 'transform 0.15s',
            display: 'flex',
          }}>
            {icons.chevronDown(14)}
          </span>
        </div>
        {layersOpen && groupedProjects.map(group => (
          <div key={group.id}>
            <div
              className="sidebar-item"
              onClick={() => togglePage(group.id)}
              style={{ paddingLeft: 8, color: 'var(--figma-text-secondary)', fontSize: 12 }}
            >
              <span style={{
                transform: expandedPages[group.id] ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.15s',
                display: 'flex',
              }}>
                {icons.chevronRight(10)}
              </span>
              {icons.page}
              <span>{group.label}</span>
            </div>
            {expandedPages[group.id] && group.projects.map(project => (
              <div
                key={project.id}
                className={`sidebar-item ${selectedCard === project.id ? 'active' : ''}`}
                onClick={() => onCardClick(project)}
                style={{ paddingLeft: 28 }}
              >
                {icons.frame}
                <span style={{ fontSize: 12 }}>{project.title}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
