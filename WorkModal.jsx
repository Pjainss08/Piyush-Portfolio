import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WORK_PROJECTS, TAG_STYLES } from './WorkSection.jsx';
import useIsMobile from './useIsMobile.js';

const Icon = ({ children, size = 20 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
  >
    {children}
  </svg>
);

function IconButton({ children, onClick, label, disabled, as = 'button', href }) {
  const style = {
    width: 32, height: 32,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'transparent', border: 'none', borderRadius: 6,
    cursor: disabled ? 'default' : 'pointer',
    color: disabled ? 'var(--figma-text-tertiary)' : 'var(--figma-text)',
    textDecoration: 'none',
    transition: 'background 0.12s',
  };
  const onHover = (e) => { if (!disabled) e.currentTarget.style.background = 'var(--figma-surface-hover)'; };
  const offHover = (e) => { e.currentTarget.style.background = 'transparent'; };

  if (as === 'a') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
        style={style} onMouseEnter={onHover} onMouseLeave={offHover}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} aria-label={label} disabled={disabled}
      style={style} onMouseEnter={onHover} onMouseLeave={offHover}>
      {children}
    </button>
  );
}

export default function WorkModal({ project, onClose, onNavigate }) {
  const isMobile = useIsMobile();
  const idx = project ? WORK_PROJECTS.findIndex(p => p.id === project.id) : -1;
  const [zoomIndex, setZoomIndex] = useState(null);

  // Ordered list of every clickable media item in this project (matches the modal's vertical flow)
  const mediaItems = useMemo(() => {
    if (!project) return [];
    const out = [];
    if (project.problemImage) out.push({ kind: 'image', src: project.problemImage });
    if (project.brandTiles?.length > 0) project.brandTiles.forEach(src => out.push({ kind: 'image', src }));
    if (project.afterApproachImage) out.push({ kind: 'image', src: project.afterApproachImage });
    if (!project.brandTiles && !project.video && !project.gallery && (project.hero || (project.image && !project.appHero))) {
      out.push({ kind: 'image', src: project.hero || project.image });
    }
    if (project.video) out.push({ kind: 'video', src: project.video });
    if (project.gallery?.length > 0 && !project.galleryPlaceholders) {
      project.gallery.forEach(src => out.push({ kind: 'image', src }));
    }
    if (project.appHero) out.push({ kind: 'image', src: project.appHero });
    if (project.videoBottom) out.push({ kind: 'video', src: project.videoBottom });
    return out;
  }, [project]);

  const openMedia = useCallback((src) => {
    const i = mediaItems.findIndex(m => m.src === src);
    if (i >= 0) setZoomIndex(i);
  }, [mediaItems]);
  const closeMedia = useCallback(() => setZoomIndex(null), []);
  const mediaPrev = useCallback(() => {
    setZoomIndex(i => i == null ? null : (i - 1 + mediaItems.length) % mediaItems.length);
  }, [mediaItems.length]);
  const mediaNext = useCallback(() => {
    setZoomIndex(i => i == null ? null : (i + 1) % mediaItems.length);
  }, [mediaItems.length]);

  useEffect(() => { setZoomIndex(null); }, [project?.id]);

  const goPrev = useCallback(() => {
    if (idx < 0) return;
    onNavigate(WORK_PROJECTS[(idx - 1 + WORK_PROJECTS.length) % WORK_PROJECTS.length]);
  }, [idx, onNavigate]);

  const goNext = useCallback(() => {
    if (idx < 0) return;
    onNavigate(WORK_PROJECTS[(idx + 1) % WORK_PROJECTS.length]);
  }, [idx, onNavigate]);

  useEffect(() => {
    if (!project) return;
    const handler = (e) => {
      if (zoomIndex != null) {
        if (e.key === 'Escape') closeMedia();
        else if (e.key === 'ArrowLeft') mediaPrev();
        else if (e.key === 'ArrowRight') mediaNext();
        return;
      }
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose, goPrev, goNext, zoomIndex, closeMedia, mediaPrev, mediaNext]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(40, 40, 40, 0.35)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            padding: isMobile ? 0 : 40,
            fontFamily: "'Figtree', sans-serif",
            overflow: 'hidden',
          }}
        >
          <motion.div
            key="frame"
            onClick={(e) => e.stopPropagation()}
            initial={isMobile ? { y: '100%' } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={isMobile
              ? { type: 'spring', damping: 32, stiffness: 320 }
              : { type: 'spring', damping: 26, stiffness: 280 }}
            style={{
              width: isMobile ? '100%' : 'min(760px, 100%)',
              height: isMobile ? '100vh' : '90vh',
              background: 'var(--figma-surface)',
              borderRadius: isMobile ? 0 : 12,
              boxShadow: isMobile
                ? '0 -8px 30px rgba(0,0,0,0.18)'
                : '0 20px 60px rgba(0,0,0,0.20), 0 6px 16px rgba(0,0,0,0.08)',
              border: '1px solid var(--figma-border)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          {/* Top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              gap: 2,
              flexShrink: 0,
              borderBottom: '1px solid var(--figma-border)',
              background: 'transparent',
            }}
          >
            {!isMobile && (
              <>
                <IconButton onClick={goPrev} label="Previous project">
                  <Icon><polyline points="15 18 9 12 15 6" /></Icon>
                </IconButton>
                <IconButton onClick={goNext} label="Next project">
                  <Icon><polyline points="9 18 15 12 9 6" /></Icon>
                </IconButton>
              </>
            )}

            <div style={{
              flex: 1,
              textAlign: isMobile ? 'left' : 'center',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--figma-text-secondary)',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: isMobile ? '0 8px' : '0 12px',
            }}>
              {project.title}
            </div>

            <IconButton onClick={onClose} label="Close">
              <Icon>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </Icon>
            </IconButton>
          </div>

          {/* Scrollable detail */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div style={{
              width: isMobile ? '100%' : 512,
              maxWidth: '100%',
              margin: '0 auto',
              padding: isMobile ? '24px 16px 48px' : '54px 0 64px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              letterSpacing: '-0.02em',
            }}>
                {/* Header block: logo → title → description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <img
                    src={project.logo || project.image}
                    alt=""
                    draggable={false}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 6,
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 500,
                      letterSpacing: '-0.04em',
                      lineHeight: '20px',
                      color: 'var(--figma-text)',
                    }}>
                      {project.title}
                    </div>
                    {project.description && (
                      <div style={{
                        fontSize: 16,
                        lineHeight: '21px',
                        letterSpacing: '-0.03em',
                        color: 'var(--figma-text-secondary)',
                        fontWeight: 400,
                      }}>
                        {project.description}
                      </div>
                    )}
                    {project.url && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4, alignItems: 'center' }}>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '4px 10px',
                            fontSize: 13,
                            fontWeight: 500,
                            color: 'var(--figma-text)',
                            background: 'var(--figma-surface-hover)',
                            borderRadius: 8,
                            letterSpacing: '-0.01em',
                            lineHeight: 1.3,
                            textDecoration: 'none',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--figma-border)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--figma-surface-hover)'}
                        >
                          Visit Site
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17 L17 7" />
                            <path d="M8 7 H17 V16" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--figma-border)', width: '100%' }} />

                {/* Role */}
                {project.role && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '-0.02em',
                      color: 'var(--figma-text)',
                    }}>
                      Role:
                    </div>
                    <div style={{
                      fontSize: 16,
                      lineHeight: '20px',
                      letterSpacing: '-0.02em',
                      color: 'var(--figma-text-secondary)',
                      fontWeight: 400,
                    }}>
                      {project.role}
                    </div>
                  </div>
                )}

                {/* Problem */}
                {project.problem && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '-0.02em',
                      color: 'var(--figma-text)',
                    }}>
                      Problem:
                    </div>
                    <div style={{
                      fontSize: 16,
                      lineHeight: '20px',
                      letterSpacing: '-0.02em',
                      color: 'var(--figma-text-secondary)',
                      fontWeight: 400,
                    }}>
                      {project.problem}
                    </div>
                  </div>
                )}

                {/* Problem image — renders right after Problem text */}
                {project.problemImage && (
                  <img
                    src={project.problemImage}
                    alt=""
                    draggable={false}
                    onClick={() => openMedia(project.problemImage)}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 4,
                      cursor: 'zoom-in',
                    }}
                  />
                )}

                {/* Brand tiles 2x2 — wide+square / square+wide (matches Figma) */}
                {project.brandTiles?.length === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <img
                        src={project.brandTiles[0]}
                        alt=""
                        draggable={false}
                        onClick={() => openMedia(project.brandTiles[0])}
                        style={{
                          flex: '1 1 0', minWidth: 0,
                          aspectRatio: '319 / 183',
                          objectFit: 'cover',
                          display: 'block', borderRadius: 4,
                          cursor: 'zoom-in',
                        }}
                      />
                      <img
                        src={project.brandTiles[1]}
                        alt=""
                        draggable={false}
                        onClick={() => openMedia(project.brandTiles[1])}
                        style={{
                          flexShrink: 0,
                          width: 'min(183px, 36%)',
                          aspectRatio: '1 / 1',
                          objectFit: 'cover',
                          display: 'block', borderRadius: 4,
                          cursor: 'zoom-in',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <img
                        src={project.brandTiles[2]}
                        alt=""
                        draggable={false}
                        onClick={() => openMedia(project.brandTiles[2])}
                        style={{
                          flexShrink: 0,
                          width: 'min(183px, 36%)',
                          aspectRatio: '1 / 1',
                          objectFit: 'cover',
                          display: 'block', borderRadius: 4,
                          cursor: 'zoom-in',
                        }}
                      />
                      <img
                        src={project.brandTiles[3]}
                        alt=""
                        draggable={false}
                        onClick={() => openMedia(project.brandTiles[3])}
                        style={{
                          flex: '1 1 0', minWidth: 0,
                          aspectRatio: '319 / 183',
                          objectFit: 'cover',
                          display: 'block', borderRadius: 4,
                          cursor: 'zoom-in',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Approach */}
                {project.approach?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '-0.02em',
                      color: 'var(--figma-text)',
                    }}>
                      Approach:
                    </div>
                    <ul style={{
                      margin: 0,
                      paddingInlineStart: 22,
                      fontSize: 16,
                      lineHeight: '24px',
                      letterSpacing: '-0.02em',
                      color: 'var(--figma-text-secondary)',
                      fontWeight: 400,
                      listStyleType: 'disc',
                      listStylePosition: 'outside',
                    }}>
                      {project.approach.map((item, i) => (
                        <li key={i} style={{ marginBottom: 4, display: 'list-item' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Image rendered right after Approach */}
                {project.afterApproachImage && (
                  <img
                    src={project.afterApproachImage}
                    alt=""
                    draggable={false}
                    onClick={() => openMedia(project.afterApproachImage)}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 4,
                      cursor: 'zoom-in',
                    }}
                  />
                )}

                {/* Legacy hero (only for projects without the new layout) */}
                {!project.brandTiles && !project.video && !project.gallery && (project.hero || (project.image && !project.appHero)) && (
                  <img
                    src={project.hero || project.image}
                    alt={project.title}
                    draggable={false}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 4,
                    }}
                  />
                )}

                {/* Legacy overview */}
                {project.overview && (
                  <p style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: '24px',
                    letterSpacing: '-0.02em',
                    color: 'var(--figma-text-secondary)',
                    fontWeight: 400,
                  }}>
                    {project.overview}
                  </p>
                )}

                {/* Video (autoplay, looped, no controls) */}
                {project.video && (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onClick={() => openMedia(project.video)}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 4,
                      cursor: 'zoom-in',
                    }}
                  />
                )}

                {/* Gallery placeholders or real images */}
                {(project.galleryPlaceholders > 0 || project.gallery?.length > 0) && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 10,
                  }}>
                    {project.galleryPlaceholders > 0
                      ? Array.from({ length: project.galleryPlaceholders }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              aspectRatio: '244 / 134',
                              background: 'var(--figma-border)',
                              border: '1px solid var(--figma-border)',
                              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
                              borderRadius: 4.8,
                            }}
                          />
                        ))
                      : project.gallery.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt=""
                            draggable={false}
                            loading="lazy"
                            onClick={() => openMedia(src)}
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              borderRadius: 4.8,
                              cursor: 'zoom-in',
                            }}
                          />
                        ))}
                  </div>
                )}

                {/* App hero (black showcase) */}
                {project.appHero && (
                  <img
                    src={project.appHero}
                    alt=""
                    draggable={false}
                    onClick={() => openMedia(project.appHero)}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 4,
                      cursor: 'zoom-in',
                    }}
                  />
                )}

                {/* Bottom video (autoplay, looped, no controls) */}
                {project.videoBottom && (
                  <video
                    src={project.videoBottom}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onClick={() => openMedia(project.videoBottom)}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 4,
                      cursor: 'zoom-in',
                    }}
                  />
                )}

                {/* Legacy details */}
                {project.details && (
                  <p style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: '24px',
                    letterSpacing: '-0.02em',
                    color: 'var(--figma-text-secondary)',
                    fontWeight: 400,
                  }}>
                    {project.details}
                  </p>
                )}
              </div>
          </div>
          </motion.div>
        </motion.div>
      )}
      {project && zoomIndex != null && mediaItems[zoomIndex] && (
        <motion.div
          key="zoom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          onClick={closeMedia}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(20, 20, 20, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? 16 : 40,
            cursor: 'zoom-out',
          }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeMedia(); }}
            aria-label="Close"
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 40, height: 40, borderRadius: 8,
              border: 'none', background: 'rgba(255,255,255,0.08)',
              color: '#fff', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            <Icon><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Icon>
          </button>

          {/* Prev */}
          {mediaItems.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); mediaPrev(); }}
              aria-label="Previous"
              style={{
                position: 'absolute', left: isMobile ? 8 : 24, top: '50%', transform: 'translateY(-50%)',
                width: 44, height: 44, borderRadius: '50%',
                border: 'none', background: 'rgba(255,255,255,0.08)',
                color: '#fff', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <Icon size={22}><polyline points="15 18 9 12 15 6" /></Icon>
            </button>
          )}

          {/* Next */}
          {mediaItems.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); mediaNext(); }}
              aria-label="Next"
              style={{
                position: 'absolute', right: isMobile ? 8 : 24, top: '50%', transform: 'translateY(-50%)',
                width: 44, height: 44, borderRadius: '50%',
                border: 'none', background: 'rgba(255,255,255,0.08)',
                color: '#fff', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <Icon size={22}><polyline points="9 18 15 12 9 6" /></Icon>
            </button>
          )}

          {/* Media */}
          {mediaItems[zoomIndex].kind === 'image' ? (
            <motion.img
              key={zoomIndex}
              src={mediaItems[zoomIndex].src}
              alt=""
              draggable={false}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                maxWidth: '92vw',
                maxHeight: '92vh',
                objectFit: 'contain',
                borderRadius: 6,
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                display: 'block',
                userSelect: 'none',
              }}
            />
          ) : (
            <motion.video
              key={zoomIndex}
              src={mediaItems[zoomIndex].src}
              autoPlay
              loop
              muted
              playsInline
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                maxWidth: '92vw',
                maxHeight: '92vh',
                objectFit: 'contain',
                borderRadius: 6,
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                display: 'block',
                userSelect: 'none',
              }}
            />
          )}

          {/* Counter */}
          {mediaItems.length > 1 && (
            <div style={{
              position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
              padding: '6px 12px', borderRadius: 999,
              background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.9)',
              fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            }}>
              {zoomIndex + 1} / {mediaItems.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
